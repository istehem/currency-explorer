import { StoreModule } from "@ngrx/store";
import { currencyFeatureKey } from "../model/state";
import { reducer } from "../currencies";
import { CurrencyViewComponent } from "./currency-view/currency-view.component";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CurrencyAddComponent } from './currency-add/currency-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from "../currency.effects";
import { CurrencyFavoritesComponent } from './currency-favorites/currency-favorites.component';

@NgModule({
    declarations: [CurrencyViewComponent, CurrencyAddComponent, CurrencyFavoritesComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(currencyFeatureKey, reducer),
        EffectsModule.forFeature([CurrencyEffects]),
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

