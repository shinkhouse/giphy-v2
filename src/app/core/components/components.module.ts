import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './search-field/search-field.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchFieldModule } from './search-field/search-field.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    SearchFieldModule
  ],
  exports: [
    SearchFieldModule
  ]
})
export class ComponentsModule { }
