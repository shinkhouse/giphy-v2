import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
]


@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        FlexLayoutModule,
        ComponentsModule,
        NgxMasonryModule,
        MatButtonModule,
        MatIconModule
    ],
})
export class SearchModule {}
