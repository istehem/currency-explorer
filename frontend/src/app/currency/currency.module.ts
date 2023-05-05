import { StoreModule } from "@ngrx/store";
import { CurrencyViewComponent } from "./currency-view/currency-view.component";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from "../currencies.effects";
import { CurrencyFavoritesComponent } from './currency-favorites/currency-favorites.component';
import { currencyStateFeatureKey } from "./model/currency.state";
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { currencyHistoryStateFeatureKey } from "./model/currency.history.state";
import { CurrencyHistoryEffects } from "../currency.history.effects";
import { currencyReducer } from "../currencies.reducer";
import { historyReducer } from "../currency.history.reducer";
import { currenciesMetaReducers } from "../currencies.meta.reducers";
import { NgxEchartsModule } from 'ngx-echarts';
import { currencyHistoryMetaReducers } from "../currency.history.meta.reducers";


@NgModule({
    declarations: [CurrencyViewComponent, CurrencyFavoritesComponent, CurrencyDetailsComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(currencyStateFeatureKey, currencyReducer, {metaReducers: currenciesMetaReducers}),
        StoreModule.forFeature(currencyHistoryStateFeatureKey, historyReducer, {metaReducers: currencyHistoryMetaReducers}),
        EffectsModule.forFeature([CurrencyEffects, CurrencyHistoryEffects]),
        NgxEchartsModule.forChild(),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CurrencyViewComponent
    ]

})
export class CurrencyModule {
}

