import {NgModule} from '@angular/core';
import {MomentPipe} from '~modules/moment/moment.pipe';

@NgModule({
    declarations: [
        MomentPipe
    ],
    exports: [
        MomentPipe
    ]
})
export class MomentPipeModule {}
