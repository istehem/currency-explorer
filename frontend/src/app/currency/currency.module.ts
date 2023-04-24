import { StoreModule } from "@ngrx/store";
import { CurrencyViewComponent } from "./currency-view/currency-view.component";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CurrencyAddComponent } from './currency-add/currency-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from "../currencies.effects";
import { CurrencyFavoritesComponent } from './currency-favorites/currency-favorites.component';
import { currencyStateFeatureKey } from "./model/currency.state";
import { CurrencyDetailsComponent } from './currency-favorites/currency-details/currency-details.component';
import { currencyHistoryStateFeatureKey } from "./model/currency.history.state";
import { CurrencyHistoryEffects } from "../currency.history.effects";
import { currencyReducer } from "../currencies.reducer";
import { historyReducer } from "../currency.history.reducer";

@NgModule({
    declarations: [CurrencyViewComponent, CurrencyAddComponent, CurrencyFavoritesComponent, CurrencyDetailsComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(currencyStateFeatureKey, currencyReducer),
        StoreModule.forFeature(currencyHistoryStateFeatureKey, historyReducer),
        EffectsModule.forFeature([CurrencyEffects, CurrencyHistoryEffects]),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CurrencyViewComponent,
        CurrencyAddComponent
    ]

})
export class CurrencyModule {
}

