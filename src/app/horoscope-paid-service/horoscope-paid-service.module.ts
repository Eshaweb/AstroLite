import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { HoroscopePaidServiceComponent } from './horoscope-paid-service/horoscope-paid-service.component';
import { LoginService } from 'src/Services/login/login.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    declarations: [HoroscopePaidServiceComponent],
    providers: [LoginService,HoroScopeService],
    exports: [
        HoroscopePaidServiceComponent
    ]
})
export class HoroscopePaidServiceModule {
}
