import { Routes } from "@angular/router";
import { CurrencyFavoritesComponent } from "./currency/currency-favorites/currency-favorites.component";
import { CurrencyViewComponent } from "./currency/currency-view/currency-view.component";

export const appRoutes: Routes = [
    { path: '', component: CurrencyFavoritesComponent },
    { path: 'favorites', component: CurrencyFavoritesComponent },
    { path: 'select', component: CurrencyViewComponent }
]