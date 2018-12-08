import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '../../node_modules/@angular/common';
import { LoginComponent } from './login/login/login.component';
import { UIService } from '../Services/UIService/ui.service';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { InfragisticsImportsModule } from './infragistics-imports/infragistics-imports.module';
import { AstamangalaModule } from './astamangala/astamangala.module';
import { AstamangalaComponent } from './astamangala/astamangala/astamangala.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { HoroscopeComponent } from './horoscope/horoscope/horoscope.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address/delivery-address.component';
import { MatchMakingModule } from './match-making/match-making.module';
import { MatchMakingComponent } from './match-making/match-making/match-making.component';
import { ServicesModule } from './services/services.module';
import { AgmCoreModule } from '../../node_modules/@agm/core';
import { ToastrModule } from 'ngx-toastr';
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
import { LoginDemoComponent } from './loginDemo/loginDemo/loginDemo.component';
import { LoginDemoModule } from './loginDemo/loginDemo.module';
import { RegistrationDemoComponent } from './registrationDemo/registrationDemo/registrationDemo.component';
import { RegistrationDemoModule } from './registrationDemo/registrationDemo.module';
import { RegistrationComponent } from './registration/registration/registration.component';
import { RegistrationModule } from './registration/registration.module';

const generatedRoutes: Routes = [
    {
        path: '',
        redirectTo: 'loginDemo',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component:LoginComponent
        //loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'registration',
        component: RegistrationComponent
        //loadChildren: './registration/registration.module#RegistrationModule'
    },
    { path: 'matchmaking', component: MatchMakingComponent },
    { path: 'horoscope', component: HoroscopeComponent },
    { path: 'delAddress', component: DeliveryAddressComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'astamangala', component: AstamangalaComponent },
    { path: 'loginDemo', component: LoginDemoComponent },
    { path: 'regDemo', component: RegistrationDemoComponent },

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
        AppComponent
    ],
    imports: [IgxProgressBarModule,IgxButtonModule, IgxIconModule, IgxRippleModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ',  
            // apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
            apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
            libraries: ['places']
        }),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-center',
            preventDuplicates: true,
        }),
        SocialLoginModule,
        EventsModule.forRoot(),
        BrowserModule, ShareButtonsModule.forRoot(),
        CommonModule, InfragisticsImportsModule,
        BrowserAnimationsModule,
        LoginModule, RegistrationModule,
        RouterModule.forRoot(generatedRoutes),
        AstamangalaModule,
        DashboardModule,
        DeliveryAddressModule,
        HoroscopeModule,
        MatchMakingModule, RegistrationDemoModule,
        ServicesModule, LoginDemoModule
    ],
    providers: [HoroScopeService,UIService, RegistrationService, SmartHttpClient, LoaderService,
        {
            provide: SmartHttpClient,
            useFactory: applicationHttpClientCreator,
            deps: [HttpClient]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
          }],
    bootstrap: [AppComponent],
    exports: [
        RouterModule
    ]
})
export class AppModule {
}
