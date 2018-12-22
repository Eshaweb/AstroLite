import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { MatchMakingComponent } from './match-making/match-making.component';
import { AgmCoreModule } from '@agm/core';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
@NgModule({
    imports: [AgmCoreModule.forRoot({
        // apiKey: "AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ",  
        // apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
        apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
        libraries: ["places"]
      }),
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    providers:[
MatchMakingService
    ],
    declarations: [MatchMakingComponent],
    exports: [
        MatchMakingComponent
    ]
})
export class MatchMakingModule {
}
