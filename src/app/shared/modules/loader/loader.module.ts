import {NgModule} from '@angular/core';
import {LoaderComponent} from './loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ],
    imports: [
        MatProgressSpinnerModule
    ]
})
export class LoaderModule {}
