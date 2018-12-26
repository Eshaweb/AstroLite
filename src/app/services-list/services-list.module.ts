import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './services-list/services-list.component';
import { InfragisticsImportsModule } from '../infragistics-imports/infragistics-imports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchMakingComponent } from '../match-making/match-making/match-making.component';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    InfragisticsImportsModule,
    
],
// declarations: [ServicesListComponent],
// exports: [
//   ServicesListComponent
// ]
})
export class ServicesListModule { }
