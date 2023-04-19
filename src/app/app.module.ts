import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
  
import { StoreModule } from '@ngrx/store';
import { CurrencyModule } from "./currency/currency.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { appRoutes } from "./routes";


@NgModule({
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [BrowserModule, 
        CurrencyModule, 
        StoreModule.forRoot({}), 
        EffectsModule.forRoot({}),
        BrowserAnimationsModule,
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ]})
export class AppModule { }