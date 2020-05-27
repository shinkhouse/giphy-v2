import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {
    HttpClientModule
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchFieldComponent } from './core/components/search-field/search-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
