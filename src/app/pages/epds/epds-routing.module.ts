import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EpdsComponent} from "./epds.component";

const routes: Routes = [
  {
    path: '',
    component: EpdsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpdsRoutingModule {}
