import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { HoroscopeFreeComponent } from './horoscope-free/horoscope-free.component';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoginService } from 'src/Services/login/login.service';
@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    declarations: [HoroscopeFreeComponent],
    providers:[HoroScopeService,LoginService],
    exports: [
        HoroscopeFreeComponent
    ]
})
export class HoroscopeFreeModule {
}
