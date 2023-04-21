from flask import Flask, request
from flask_restful import Resource, Api, fields, marshal_with
from werkzeug.exceptions import NotFound, BadRequest
from datetime import datetime
import numbers

app = Flask(__name__)
api = Api(app)

db = dict()

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

class Price(fields.Raw):
    def __init__(self, price):
        self.price = price
        self.timestamp = datetime.now()
        
class Currency():
    def __init__(self, id, price): 
        self.id = id
        self.price = Price(price)
        self.price_history = []
    def new_price(self, price):
        self.price_history.append(self.price)
        self.price = Price(price)    

class Status(Resource):
    def get(self):
        return {'up': 'true'}


class SingleCurrency(Resource):
    @marshal_with(currency_fields)
    def get(self, currency_id):
        if not currency_id in db:
            raise NotFound("Entry Not Found")
        return db[currency_id]
    @marshal_with(currency_fields)    
    def post(self, currency_id):
        data = request.get_json()
        price = data['price']
        if not price or not isinstance(price, numbers.Number):   
           raise BadRequest(f"field 'price' is required and must be a number in the request body: {data}")
        currency = None
        if not currency_id in db:
            currency = Currency(currency_id, price)
            db[currency_id] = currency
            return currency
        currency = db[currency_id]
        currency.new_price(price)
        return currency    

api.add_resource(Status, '/status')
api.add_resource(SingleCurrency, '/currencies/<string:currency_id>')

if __name__ == '__main__':
    app.run(debug=True)