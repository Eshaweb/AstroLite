import { EventsService } from '../../node_modules/angular4-events';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import {
  Router,
  Event,
  NavigationExtras,
  NavigationEnd,
  NavigationStart,
  NavigationError,
  NavigationCancel
} from '@angular/router';

import { IgxToastComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { PubSubService } from 'src/shared/pub-sub.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Astrolite';
  name = 'https://twitter.com/';
  isEnabled: boolean = false;
  isLogOut: boolean;
  open: boolean = false;
  position = 'left';
  drawerMiniWidth = '';
  navigationInProgress: boolean = true;
  showAddButton: boolean;
  private toastRequested: Subscription;
  private setTitleRequested: Subscription;
  private showAddButtonRequested: Subscription;

  @ViewChild('toast') toast: IgxToastComponent;

  public navigationItems: Array<{
    text: string,
    link: string
  }> = [];
  constructor(public event: EventsService, public router: Router, public pubSubService: PubSubService) {
    this.event.subscribe('REFRESH_DIGIPARTYNAME', () => {
      this.isLogOut = true;
    });

     // this.navigationItems.push({ icon: 'people.png', text: 'HoroScope', link: '/horoscope' });
    // this.navigationItems.push({ icon: 'sales.png', text: 'Match Making', link: '/matchmaking' });
    // this.navigationItems.push({ icon: 'people.png', text: 'Astamangala', link: '/astamangala' });
    this.navigationItems.push({ text: 'Home', link: '/home' });
    this.navigationItems.push({ text: 'Horoscope', link: '/services/#SH' });
    this.navigationItems.push({ text: 'Match Making', link: '/services/#SM' });
    this.navigationItems.push({ text: 'Register', link: '/registration' });
    this.navigationItems.push({ text: 'Login', link: '/login' });
    this.navigationItems.push({ text: 'Wallet Deposit', link: '/depoToWallet' });

    router.events.subscribe((routerEvent: Event) => {
      this.processRouterEvent(routerEvent);
    });

    this.toastRequested = this.pubSubService.toastRequested$.subscribe((toastMessage) => {
      this.toast.message = toastMessage;
      this.toast.show();
    });

    this.setTitleRequested = this.pubSubService.setTitleRequested$.subscribe((titletext) => {
      setTimeout(() => {
        this.title = titletext;
      });
    });

    this.showAddButtonRequested = this.pubSubService.showAddButtonRequested$.subscribe((showAddButton) => {
      setTimeout(() => {
        this.showAddButton = showAddButton;
      });
    });
  }
  onclick() {
    return this.name + this.guid();
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    //return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return 'ram';
  }
  invite() {
    this.isEnabled = true;
  }
  ngOnDestroy(): void {
    this.toastRequested.unsubscribe();
    this.setTitleRequested.unsubscribe();
    this.showAddButtonRequested.unsubscribe();
  }

  onAddClicked() {
    this.pubSubService.addRequested();
  }

  private processRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.navigationInProgress = true;
      this.showAddButton = true;
      return;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {

      setTimeout(() => {
        this.navigationInProgress = false;
      });

      if (routerEvent instanceof NavigationError) {
        const navigationExtras: NavigationExtras = {
          queryParams: { error: 'App Component handled uncaught NavigationError', errorObject: routerEvent.error.message }
        };

        this.router.navigate(['/error'], navigationExtras);
      }
    }
  }
}
