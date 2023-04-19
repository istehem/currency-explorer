import { EntityState } from "@ngrx/entity";
import { Currency } from "./currency";

export const currencyStateFeatureKey = 'currency';

export interface CurrencyState extends EntityState<Currency> {
}