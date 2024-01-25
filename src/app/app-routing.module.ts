import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/search/search.module').then(
            (m) => m.SearchModule
        ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
