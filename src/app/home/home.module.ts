import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
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
        //NgxLoadingModule.forRoot({}),
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent
            },
        ])
    ],
    declarations: [HomeComponent],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
