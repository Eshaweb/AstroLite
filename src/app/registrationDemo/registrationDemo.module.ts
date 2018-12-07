import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { RegistrationService } from '../../Services/registration/registration.service';
import { SmartHttpClient, applicationHttpClientCreator } from '../../Services/shared/http-client/smart-httpclient.service';
import { HttpClient, HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { AuthInterceptor } from '../../Services/auth/auth.interceptor';
import { LoginService } from '../../Services/login/login.service';
import { IgxProgressBarModule, IgxButtonModule, IgxIconModule, IgxRippleModule } from '../../../node_modules/igniteui-angular';
import { RegistrationDemoComponent } from './registrationDemo/registrationDemo.component';
@NgModule({
    imports: [
        CommonModule,IgxProgressBarModule,IgxButtonModule, IgxIconModule, IgxRippleModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    providers: [RegistrationService,LoginService,
        {
            provide: SmartHttpClient,
            useFactory: applicationHttpClientCreator,
            deps: [HttpClient]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,

        },],
    declarations: [RegistrationDemoComponent],
    exports: [
        RegistrationDemoComponent
    ]
})
export class RegistrationDemoModule {
}
