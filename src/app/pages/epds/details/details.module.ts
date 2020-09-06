import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsDetailsComponent} from './details.component';

@NgModule({
    declarations: [
        EpdsDetailsComponent
    ],
    exports: [
        EpdsDetailsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class EpdsDetailsModule {}
