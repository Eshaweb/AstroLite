import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import {
  IgxAvatarModule,
  IgxBadgeModule,
  IgxButtonModule,
  IgxCheckboxModule,
  IgxDatePickerModule,
  IgxDialogModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxListModule,
  IgxNavbarModule,
  IgxNavigationDrawerModule,
  IgxProgressBarModule,
  IgxRadioModule,
  IgxRippleModule,
  IgxForOfModule,
  IgxSliderModule,
  IgxSwitchModule,
  IgxToastModule
} from 'igniteui-angular';

import 'hammerjs';
import { PubSubService } from './pub-sub.service';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        HttpModule,
        IgxAvatarModule,
        IgxBadgeModule,
        IgxButtonModule,
        IgxCheckboxModule,
        IgxDatePickerModule,
        IgxDialogModule,
        IgxIconModule,
        IgxInputGroupModule,
        IgxListModule,
        IgxNavbarModule,
        IgxNavigationDrawerModule,
        IgxProgressBarModule,
        IgxRadioModule,
        IgxRippleModule,
        IgxForOfModule,
        IgxSliderModule,
        IgxSwitchModule,
        IgxToastModule
    ],
    providers: [
        PubSubService
    ],
    exports: [
        CommonModule,
        HttpModule,
        IgxAvatarModule,
        IgxBadgeModule,
        IgxButtonModule,
        IgxCheckboxModule,
        IgxDatePickerModule,
        IgxDialogModule,
        IgxIconModule,
        IgxInputGroupModule,
        IgxListModule,
        IgxNavbarModule,
        IgxNavigationDrawerModule,
        IgxProgressBarModule,
        IgxRadioModule,
        IgxRippleModule,
        IgxForOfModule,
        IgxSliderModule,
        IgxSwitchModule,
        IgxToastModule
    ]
})
export class SharedModule { }
