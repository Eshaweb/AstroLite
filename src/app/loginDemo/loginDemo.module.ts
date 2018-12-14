import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { Routes, RouterModule } from '../../../node_modules/@angular/router';
import { IgxButtonModule, IgxDialogModule } from '../../../node_modules/igniteui-angular';
import { LoginDemoComponent } from './loginDemo/loginDemo.component';

@NgModule({
    imports: [
        CommonModule,IgxButtonModule,
		IgxDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    declarations: [LoginDemoComponent],
    exports: [
        LoginDemoComponent
    ]
})
export class LoginDemoModule {
}
