import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule } from '../../node_modules/@angular/common';
import { UIService } from '../Services/UIService/ui.service';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { InfragisticsImportsModule } from './infragistics-imports/infragistics-imports.module';
import { DeliveryAddressComponent } from './delivery-address/delivery-address/delivery-address.component';
import { ServicesModule } from './services/services.module';
import { AgmCoreModule } from '../../node_modules/@agm/core';
//import { ToastrModule } from 'ngx-toastr';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxLoadingModule } from 'ngx-loading';
import { RegistrationService } from '../Services/registration/registration.service';
import { SmartHttpClient, applicationHttpClientCreator } from '../Services/shared/http-client/smart-httpclient.service';
import { LoaderService } from '../Services/shared/loader.service';
import { HttpClient, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { EventsModule } from 'angular4-events';
import { AuthInterceptor } from '../Services/auth/auth.interceptor';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { HoroScopeService } from '../Services/HoroScopeService/HoroScopeService';
import { IgxProgressBarModule, IgxButtonModule, IgxIconModule, IgxRippleModule } from '../../node_modules/igniteui-angular';
import { HoroscopePaidServiceComponent } from './horoscope-paid-service/horoscope-paid-service/horoscope-paid-service.component';
import { SharedModule } from 'src/shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AstroLiteServicesComponent } from './AstroLite-Services/astroLite-services.component';
import { HoropaidComponent } from './horopaid/horopaid/horopaid.component';
import { PaidervicesComponent } from './paidervices/paidervices.component';
import { ServicesComponent } from './services/services/services.component';
import { MatchMakingComponent } from './match-making/match-making/match-making.component';
import { HoroscopeFreeComponent } from './horoscope-free/horoscope-free/horoscope-free.component';
import { LoginComponent } from './login/login/login.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home/home.component';
import { DepositWalletModule } from './deposit-wallet/deposit-wallet.module';
import { DepositWalletComponent } from './deposit-wallet/deposit-wallet/deposit-wallet.component';
import { MatchMakingReportComponent } from './match-making-report/match-making-report/match-making-report.component';
import { LoginService } from 'src/Services/login/login.service';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { HoroscopeComponent } from './horoscope/horoscope/horoscope.component';


const generatedRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    //{ path: 'home', component: HomeComponent },
    { 
        path: 'home', 
        loadChildren: './home/home.module#HomeModule' 
    },
    { path: 'login', component:LoginComponent },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    //  { path: 'matchmaking', component: MatchMakingComponent },
    //  { path: 'matchmakingReport', component: MatchMakingReportComponent },
    //  { path: 'deliveryAddress', component: DeliveryAddressComponent },
      { path: 'depoToWallet', component: DepositWalletComponent },
    // { path: 'horoscopeFree', component: HoroscopeFreeComponent },
    // { path: 'horoscopePaid', component: HoropaidComponent },
    // { path: 'paidServices', component: PaidervicesComponent },
    // { path: 'dashboard', component: DashboardComponent },
    // { path: 'AstroServices', component: AstroLiteServicesComponent },
    { 
        path: 'services', 
        //component:ServicesComponent
        loadChildren: './services/services.module#ServicesModule' 
    },
    { path: 'pagenotfound', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'pagenotfound' }
];

let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      //provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
      //provider: new GoogleLoginProvider('589412237379-3t0l5l20bvs23l8mp6eqf6jncn5d8m6l.apps.googleusercontent.com')
      //provider: new GoogleLoginProvider('554058829679-doeuifcl3hhqiptbtsfgmt763r1t8m9j.apps.googleusercontent.com')
      provider: new GoogleLoginProvider('589412237379-s95au712mktgn6o0d9ebocp824si3d0c.apps.googleusercontent.com')
  
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("1123555431133200")
    },
    {
      id: LinkedInLoginProvider.PROVIDER_ID,
      provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
    }
  ]);

  export function provideConfig() {
    return config;
  }
  
@NgModule({
    declarations: [
        AppComponent,PageNotFoundComponent,  
        AstroLiteServicesComponent, PaymentProcessingComponent
        ],
    imports: [
        NgxLoadingModule.forRoot({}),
        ToastrModule.forRoot(),
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ',  
            // apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
            apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
            libraries: ['places']
        }),
        // ToastrModule.forRoot({
        //     timeOut: 5000,
        //     positionClass: 'toast-bottom-center',
        //     preventDuplicates: true,
        // }),
        SocialLoginModule,
        EventsModule.forRoot(),
        BrowserModule.withServerTransition({appId: 'my-app'}),
         ShareButtonsModule.forRoot(),
        CommonModule, InfragisticsImportsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(generatedRoutes, {
            preloadingStrategy: PreloadAllModules
        }),
        //LoginModule,
        HomeModule, 
        //RegistrationModule,
        //MatchMakingModule,
        //AstamangalaModule,
        //DashboardModule,
        SharedModule,
        ServicesModule, 
        DepositWalletModule,
        //RegistrationDemoModule,
        //LoginOldModule,
        //LoginDemoModule
    ],
    providers: [LoginService,HoroScopeService,UIService, RegistrationService, SmartHttpClient, LoaderService,
        {
            provide: SmartHttpClient,
            useFactory: applicationHttpClientCreator,
            deps: [HttpClient]
        },
        { provide: APP_BASE_HREF, useValue: '/' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
          }
        ],
    bootstrap: [AppComponent],
    exports: [
        RouterModule
    ]
})
export class AppModule {
}
