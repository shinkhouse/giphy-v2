import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from './search-field.component';


@NgModule({
  declarations: [SearchFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SearchFieldComponent
  ]
})
export class SearchFieldModule { }
