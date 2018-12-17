import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { HoroscopePaidServiceComponent } from './horoscope-paid-service/horoscope-paid-service.component';
@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    declarations: [HoroscopePaidServiceComponent],
    exports: [
        HoroscopePaidServiceComponent
    ]
})
export class HoroscopePaidServiceModule {
}
