import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './search-field/search-field.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchFieldModule } from './search-field/search-field.module';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ScrollToTopModule } from './scroll-to-top/scroll-to-top.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    SearchFieldModule,
    ScrollToTopModule
  ],
  exports: [
    SearchFieldModule,
    ScrollToTopModule
  ],
  declarations: []
})
export class ComponentsModule { }
