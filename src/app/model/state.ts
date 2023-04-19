import { Currency } from "../currency/model/currency";

export const currencyFeatureKey = 'currency';

export interface State {
    currencies : Array<Currency>
    selectedCurrencies : Array<Currency>
}