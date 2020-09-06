import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'epds'
    },
    {
        path: 'epds',
        loadChildren: () => import('./pages/epds/epds.module').then(m => m.EpdsModule)
    },
    {
        path: 'tariffs',
        loadChildren: () => import('./pages/tariffs/tariffs.module').then(m => m.TariffsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
