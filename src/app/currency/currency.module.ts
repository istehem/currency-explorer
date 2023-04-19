import { StoreModule } from "@ngrx/store";
import { reducer } from "../currencies";
import { CurrencyViewComponent } from "./currency-view/currency-view.component";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CurrencyAddComponent } from './currency-add/currency-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from "../currency.effects";
import { CurrencyFavoritesComponent } from './currency-favorites/currency-favorites.component';
import { currencyStateFeatureKey } from "./model/currency.state";

@NgModule({
    declarations: [CurrencyViewComponent, CurrencyAddComponent, CurrencyFavoritesComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(currencyStateFeatureKey, reducer),
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

