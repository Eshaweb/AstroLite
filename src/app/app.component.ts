import { Component } from '@angular/core';
import { EventsService } from '../../node_modules/angular4-events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AstroLiteInIndigo';
  name = 'https://twitter.com/';
  isEnabled: boolean=false;
  isLogOut: boolean;
  constructor(private event:EventsService){
    this.event.subscribe('REFRESH_DIGIPARTYNAME', () => {
      this.isLogOut =true;
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
  invite(){
    this.isEnabled=true;
  }
}
