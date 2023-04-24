import { EntityState } from "@ngrx/entity";
import { CurrencyHistory } from "./currency.history";

export const currencyHistoryStateFeatureKey = 'currencyHistory';

export interface CurrencyHistoryState extends EntityState<CurrencyHistory> {
}