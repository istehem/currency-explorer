from flask import Flask, request
from flask_cors import CORS
from flask_restful import Resource, Api, fields, marshal_with, marshal
from werkzeug.exceptions import NotFound, BadRequest
from datetime import datetime
import numbers
import os
import json
from tinydb import TinyDB, Query

app = Flask(__name__)
CORS(app)
api = Api(app)

def get_db_path():
    current = os.path.dirname(os.path.realpath(__file__))
    return os.path.join(current, 'db', 'db.json')

db = TinyDB(get_db_path())

class Date(fields.Raw):
    def format(self, value):
        if not value or not isinstance(value, datetime):
            raise ValueError("Value must not be null and must be of type 'datetime'")
        return value.isoformat()

price_fields = {}
price_fields['price'] = fields.String
price_fields['timestamp'] = Date

currency_fields = {
    'id':    fields.String,
    'price': fields.Nested(price_fields),
    'price_history' : fields.List(fields.Nested(price_fields))
}

currencies_fields = {
    'data': fields.List(fields.Nested(currency_fields))
}

def marshal_currency(currency):
    return marshal(currency, currency_fields)

class Price(fields.Raw):
    def __init__(self, price, timestamp):
        self.price = price
        self.timestamp = timestamp

class Currency():
    def __init__(self, id, price, timestamp):
        self.id = id
        self.price = Price(price, timestamp)
        self.price_history = []
    def new_price(self, price):
        self.price_history.append(self.price)
        self.price = Price(price, datetime.now())

class Status(Resource):
    def get(self):
        return {'up': 'true'}


class SingleCurrency(Resource):
    def __init__(self):
        self.currency_history = db.table('currency_history')
        self.currency_query = Query()

    def __to_currency(self, db_result):
        id = db_result['id']
        price = db_result['price']['price']
        timestamp = datetime.fromisoformat(db_result['price']['timestamp'])
        currency = Currency(id, price, timestamp)
        for ph in db_result['price_history']:
            ph_price = ph['price']
            ph_timestamp = datetime.fromisoformat(ph['timestamp'])
            currency.price_history.append(Price(ph_price, ph_timestamp))
        return currency

    def get(self, currency_id):
        result = self.currency_history.search(self.currency_query.id == currency_id)
        if not result:
            raise NotFound("Currency Entry Not Found")
        return result[0]

    @marshal_with(currency_fields)
    def post(self, currency_id):
        data = request.get_json()
        price = data['price']
        if not price or not isinstance(price, numbers.Number):
           raise BadRequest(f"field 'price' is required and must be a number in the request body: {data}")
        db_result = self.currency_history.search(self.currency_query.id == currency_id)
        if not db_result:
            currency = Currency(currency_id, price, datetime.now())
            self.currency_history.insert(marshal_currency(currency))
            return currency
        currency = self.__to_currency(db_result[0])
        currency.new_price(price)
        self.currency_history.update(marshal_currency(currency), self.currency_query.id == currency_id)
        return currency

api.add_resource(Status, '/status')
api.add_resource(SingleCurrency, '/currencies/<string:currency_id>')

if __name__ == '__main__':
    app.run(debug=True)
