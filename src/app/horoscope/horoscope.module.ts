import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { AgmCoreModule } from '@agm/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { LoginService } from 'src/Services/login/login.service';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { NgxLoadingModule } from 'ngx-loading';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';


@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            // apiKey: "AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ",  
            // apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
            apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
            libraries: ["places"]
        }),
        NgxLoadingModule.forRoot({}),
        CommonModule,
        //ToastrModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule,
        // RouterModule.forChild([
        //     {
        //         path: 'services',
        //         component: ServicesComponent,
        //         //resolve: { people: PeopleResolverService },
        //         children: [
        //             {
        //                 //path: 'horoscope',
        //                 path: '#SH',
        //                 component: HoroscopeComponent,
        //                 //loadChildren: './services/services.module#ServicesModule'
        //                 //resolve: { person: PersonResolverService }
        //             },
        //             {
        //                 //path: 'matchmaking',
        //                 path: '#SM',
        //                 component: MatchMakingComponent,
        //                 //resolve: { person: PersonResolverService },
        //                 //canDeactivate: [PeopleEditGuardService],
        //             },
        //             {
        //                 path: 'horoscopeFree',
        //                 component: HoroscopeFreeComponent,
        //                 //resolve: { person: PersonResolverService }
        //             },
        //             { path: 'registration', component: RegistrationComponent },
        //             { path: 'matchFree', component: MatchMakingReportComponent },
        //             { path: 'login', component: LoginComponent },
        //             { path: 'horoscopePaid', component: PaidervicesComponent },
        //             { path: 'deliveryAddress', component: DeliveryAddressComponent },
        //             { path: 'paidServices', component: PaidervicesComponent },
        //             { path: 'payment', component: PaymentComponent },
        //             { path: 'paymentProcessing', component: PaymentProcessingComponent }
        //         ]
        //     },
        // ])
    ],
    declarations: [
        HoroscopeComponent
    ],
    providers: [
        HoroScopeService, MatchMakingService, LoginService,
        PartyService, RegistrationService
    ]
})
export class HoroscopeModule {

}
