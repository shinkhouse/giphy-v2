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
import { ImageViewerComponent } from './core/components/image-viewer/image-viewer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [AppComponent, ImageViewerComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
