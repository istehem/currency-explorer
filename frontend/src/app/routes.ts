import { Routes } from "@angular/router";
import { CurrencyFavoritesComponent } from "./currency/currency-favorites/currency-favorites.component";
import { CurrencyViewComponent } from "./currency/currency-view/currency-view.component";
import { CurrencyDetailsComponent } from "./currency/currency-details/currency-details.component";
import { NotFoundComponentComponent } from "./not-found-component/not-found-component.component";

export const appRoutes: Routes = [
    {
        path: '', component: CurrencyFavoritesComponent
    },
    {
        path: 'favorites', component: CurrencyFavoritesComponent
    },
    {
        path: 'favorites/currency-details/:id', component: CurrencyDetailsComponent
    },
    {
        path: 'select', component: CurrencyViewComponent
    },
    {
        path: '**', component: NotFoundComponentComponent
    }
]