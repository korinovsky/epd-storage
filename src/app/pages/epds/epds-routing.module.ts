import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EpdsComponent} from './epds.component';
import {EpdsFormComponent} from '~app/pages/epds/form/form.component';
import {EpdsDetailsComponent} from '~app/pages/epds/details/details.component';

const routes: Routes = [
    {
        path: '',
        component: EpdsComponent
    },
    {
        path: 'create',
        component: EpdsFormComponent
    },
    {
        path: 'edit/:id',
        component: EpdsFormComponent
    },
    {
        path: ':id',
        component: EpdsDetailsComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EpdsRoutingModule {}
