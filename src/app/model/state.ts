import { Currency } from "./currency";

export const currencyFeatureKey = 'currency';

export interface State {
    currencies : Array<Currency>
    selectedCurrencies : Array<Currency>
}