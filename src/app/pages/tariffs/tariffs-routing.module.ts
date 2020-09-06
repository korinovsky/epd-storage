import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TariffsComponent} from './tariffs.component';
import {TariffsDetailsComponent} from '~app/pages/tariffs/details/details.component';
import {TariffsFormComponent} from '~app/pages/tariffs/form/form.component';

const routes: Routes = [
    {
        path: '',
        component: TariffsComponent
    },
    {
        path: 'create',
        component: TariffsFormComponent
    },
    {
        path: 'edit/:id',
        component: TariffsFormComponent
    },
    {
        path: ':id',
        component: TariffsDetailsComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TariffsRoutingModule {}
