import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { ServicesComponent } from './services/services.component';
import { AstamangalaComponent } from '../astamangala/astamangala/astamangala.component';
import { MatchMakingComponent } from '../match-making/match-making/match-making.component';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';
import { ServicesListComponent } from '../services-list/services-list/services-list.component';
import { RouterModule } from '@angular/router';
import { HoroscopeFreeComponent } from '../horoscope-free/horoscope-free/horoscope-free.component';
import { HoropaidComponent } from '../horopaid/horopaid/horopaid.component';
import { DeliveryAddressComponent } from '../delivery-address/delivery-address/delivery-address.component';
import { LoginComponent } from '../login/login/login.component';
import { PaidervicesComponent } from '../paidervices/paidervices.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule,
        RouterModule.forChild([
            {
                path: 'services',
                component: ServicesComponent,
                //resolve: { people: PeopleResolverService },
                children: [
                    {
                        path: 'horoscope',
                        component: HoroscopeComponent,
                        //resolve: { person: PersonResolverService }
                    },
                    {
                        path: 'matchmaking',
                        component: MatchMakingComponent,
                        //resolve: { person: PersonResolverService },
                        //canDeactivate: [PeopleEditGuardService],
                    },
                    {
                        path: 'horoscopeFree',
                        component: HoroscopeFreeComponent,
                        //resolve: { person: PersonResolverService }
                    },
                    { path:'login', component:LoginComponent},
                    { path:'horoscopePaid', component:HoropaidComponent},
                    { path:'deliveryAddress', component:DeliveryAddressComponent},
                    { path:'paidServices', component:PaidervicesComponent}

                ]
            }
        ])
    ],
    declarations: [ServicesComponent,ServicesListComponent],
    exports: [
        ServicesComponent,ServicesListComponent
    ]
})
export class ServicesModule {
}
