import { Routes } from "@angular/router";
import { CurrencyDetailsComponent } from "./currency/currency-details/currency-details.component";
import { CurrencyFavoritesComponent } from "./currency/currency-favorites/currency-favorites.component";
import { CurrencyViewComponent } from "./currency/currency-view/currency-view.component";
import { NotFoundComponentComponent } from "./not-found-component/not-found-component.component";
import { ServerErrorComponentComponent } from "./server-error-component/server-error-component.component";

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
        path: '500', component: ServerErrorComponentComponent
    },
    {
        path: '404', component: NotFoundComponentComponent
    },
    {
        path: '**', component: NotFoundComponentComponent
    }
]