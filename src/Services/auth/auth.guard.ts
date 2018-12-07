import { Injectable, ViewChild } from '@angular/core';
//import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PartyService } from '../../Services/PartyService/PartyService';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
//import { RegisterService } from '../services/app-data.service';

@Injectable()
// export class AuthGuard implements CanActivate {
export class AuthGuard {
//   constructor(private registerService: PartyService, private router : Router){}
// constructor(public navCtrl: NavController, private partyService: PartyService){}
constructor(private route: ActivatedRoute,
  private router: Router, private partyService: PartyService){}
// canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {
canActivate():  boolean {
//if (localStorage.getItem('userToken') != null)
      if(this.partyService.Token!=null)
      return true;
       //this.router.navigateByUrl('/login');
      //this.navCtrl.push(LoginPage);
      this.router.navigate(['login']);
       return false;
  }
}
