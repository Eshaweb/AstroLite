import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { ServicesComponent } from './services/services.component';
import { ServicesListComponent } from '../services-list/services-list/services-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HoropaidComponent } from '../horopaid/horopaid/horopaid.component';
import { DeliveryAddressComponent } from '../delivery-address/delivery-address/delivery-address.component';
import { LoginComponent } from '../login/login/login.component';
import { PaidervicesComponent } from '../paidervices/paidervices.component';
import { HoroscopeFreeComponent } from '../horoscope-free/horoscope-free/horoscope-free.component';
import { MatchMakingReportComponent } from '../match-making-report/match-making-report/match-making-report.component';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';
import { PaymentOldComponent } from '../paymentOld/paymentOld/paymentOld.component';
import { MatchMakingComponent } from '../match-making/match-making/match-making.component';
import { PaymentOldModule } from '../paymentOld/paymentOld.module';
import { PaymentProcessingComponent } from '../payment-processing/payment-processing.component';
import { HoroscopePaidServiceComponent } from '../horoscope-paid-service/horoscope-paid-service/horoscope-paid-service.component';
import { AgmCoreModule } from '@agm/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { LoginService } from 'src/Services/login/login.service';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { RegistrationComponent } from '../registration/registration/registration.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { DepositWalletComponent } from '../deposit-wallet/deposit-wallet/deposit-wallet.component';


@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            // apiKey: "AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ",  
            // apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
            apiKey: "AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es",
            libraries: ["places"]
          }),
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule,
        //DeliveryAddressModule, 
        //PaymentOldModule,
        //HoroscopeModule,
        //HoroscopeFreeModule,
        //HoroscopePaidServiceModule,
        //HoropaidModule,
        //MatchMakingModule, 
        //MatchMakingReportModule,
        RouterModule.forChild([
            {
                path: 'services',
                component: ServicesComponent,
                //resolve: { people: PeopleResolverService },
                children: [
                    {
                        //path: 'horoscope',
                        path:'#SH',
                        component: HoroscopeComponent,
                        //resolve: { person: PersonResolverService }
                    },
                    {
                        //path: 'matchmaking',
                        path:'#SM',
                        component: MatchMakingComponent,
                        //resolve: { person: PersonResolverService },
                        //canDeactivate: [PeopleEditGuardService],
                    },
                    {
                        path: 'horoscopeFree',
                        component: HoroscopeFreeComponent,
                        //resolve: { person: PersonResolverService }
                    },
                    { path:'matchFree', component:MatchMakingReportComponent},
                    { path:'login', component:LoginComponent},
                    { path:'horoscopePaid', component:PaidervicesComponent},
                    { path:'deliveryAddress', component:DeliveryAddressComponent},
                    { path:'paidServices', component:PaidervicesComponent},
                    { path: 'payment', component: PaymentOldComponent },
                    { path:'paymentProcessing', component:PaymentProcessingComponent}
                ]
            }, 
        ])
    ],
    declarations: [HoroscopeComponent,
        MatchMakingComponent,
        DeliveryAddressComponent,
        PaymentOldComponent,
        HoroscopeFreeComponent,
        HoroscopePaidServiceComponent,
        HoropaidComponent,
        MatchMakingComponent,
        LoginComponent,
        RegistrationComponent,
        DashboardComponent,
        //DepositWalletComponent,
        MatchMakingReportComponent,
        ServicesComponent,ServicesListComponent, PaidervicesComponent],
        providers:[HoroScopeService,MatchMakingService,LoginService,
        PartyService],
    exports: [
        ServicesComponent,ServicesListComponent, PaidervicesComponent
    ]
})
export class ServicesModule {
}
