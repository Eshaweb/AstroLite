import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { HoropaidComponent } from './horopaid/horopaid.component';
@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    declarations: [HoropaidComponent],
    exports: [
        HoropaidComponent
    ]
})
export class HoropaidModule {
}
