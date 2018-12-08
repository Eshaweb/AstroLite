import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { HoroscopeComponent } from './horoscope/horoscope.component';
import { AgmCoreModule } from '../../../node_modules/@agm/core';
import { ToastrModule } from '../../../node_modules/ngx-toastr';
import { HoroScopeService } from '../../Services/HoroScopeService/HoroScopeService';
import { PartyService } from '../../Services/PartyService/PartyService';
@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            // apiKey: "AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ",  
            // apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
            apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
            libraries: ["places"]
          }),
          ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-center',
            preventDuplicates: true,
        }),
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    providers: [HoroScopeService, PartyService],
    declarations: [HoroscopeComponent],
    exports: [
        HoroscopeComponent
    ]
})
export class HoroscopeModule {
}
