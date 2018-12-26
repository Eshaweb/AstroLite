import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { DepositWalletComponent } from './deposit-wallet/deposit-wallet.component';
import { SalesService } from 'src/Services/sales/sales.service';
@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InfragisticsImportsModule
    ],
    providers:[SalesService],
    declarations: [DepositWalletComponent],
    exports: [
        DepositWalletComponent
    ]
})
export class DepositWalletModule {
}
