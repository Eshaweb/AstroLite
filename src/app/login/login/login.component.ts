import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Location } from "@angular/common";
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { OrderModel } from 'src/Models/HoroScope/OrderModel';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { EventsService } from 'angular4-events';
import { LoginService } from 'src/Services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IgxDialogComponent } from 'igniteui-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("dialog")
  public dialog: IgxDialogComponent;
    
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  isLoading: boolean=false;
  loading: boolean=false;
  errorMessage: any;

    login(){
        this.isLoading=true;
        this.router.navigate(['regDemo']);
    }
    ngAfterViewInit(): void {
     
    }
    public onDialogOKSelected(event) {
      event.dialog.close();
    }
  
    public signIn(event) {
      event.dialog.close();
    }
    ngOnDestroy(): void {

    }

    private user: SocialUser;
  private loggedIn: boolean;

  ngOnInit() {
    this.events.publish('REFRESH_DIGIPARTYNAME'); 
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // this.loginService.getPhoneNumberFromFacebookAccount().subscribe((data: any) => {
      //   var ccc = data;
      // });
      this.loggedIn = (user != null);
    });
  }
  loginForm: FormGroup;
  mobilenoMessage: string;
  passwordMessage: string;
  isMobileNoEntered: boolean;
  showerrortext: boolean;
  oTPRef: any;
  isOTPRequested: boolean = false;
  isLoginByOTP: boolean;
  orderModel: OrderModel;
  Name: any;
  horoInfo: any;

  constructor(public toastrService: ToastrManager, public _location: Location, public events:EventsService, public route: ActivatedRoute, public router: Router, public http: HttpClient, 
    public authService: AuthService, public horoScopeService: HoroScopeService, public loginService: LoginService, 
    public uiService: UIService, public formbuilder: FormBuilder) {
    
    this.route.params.subscribe(params => {
        //this.id = +params['OrderId']; // (+) converts string 'id' to a number
        this.orderModel = params['orderModel'];
        this.horoInfo = params['HoroInfo'];
        // In a real app: dispatch action to load the details here.
    });
    this.loginForm = this.formbuilder.group({
      mobileno: [8660506866, [Validators.required, Validators.minLength(10)]],
      password: ['Auto@123', [Validators.required, Validators.minLength(4)]]
    });
    const mobilenoContrl = this.loginForm.get('mobileno');
    mobilenoContrl.valueChanges.subscribe(value => this.setErrorMessage(mobilenoContrl));

    const passwordControl = this.loginForm.get('password');
    passwordControl.valueChanges.subscribe(value => this.setErrorMessage(passwordControl));
  }

  setErrorMessage(c: AbstractControl): void {
    this.mobilenoMessage = '';
    this.passwordMessage = '';
    let control = this.uiService.getControlName(c);
    if ((c.touched || c.dirty) && c.errors) {
      if (control === 'mobileno') {
        this.mobilenoMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      }
      else if (control === 'password') {
        this.passwordMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      }
    }
  }
  private validationMessages = {
    mobileno_required: 'Enter Mobile No',
    mobileno_minlength: 'Minimum length should be 10',

    password_required: 'Enter Password',
    password_minlength: 'Minimum length should be 3',
  };

  // onMobileNo(event) {
  //   if (event.length < 10) {  //checks for mobileno length
  //     this.isMobileNoEntered = false;
  //     return this.showerrortext = true;
  //   }
  //   else {
  //     this.loginService.GetOTP(event);

  //   }
  // }
  dismiss() {
    //this.viewCtrl.dismiss();
  }
  onMobileNo() {
    // if (event.length < 10) {  //checks for mobileno length
    //   this.isMobileNoEntered = false;
    //   return this.showerrortext = true;
    // }
    // else {
    var MobileNo = this.loginForm.get('mobileno').value;
    this.loginService.GetOTP(MobileNo);
    this.isOTPRequested = true;
    //}
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // const loginModel = {
    //   MobileNo: this.loginForm.get('mobileno').value,
    //   Password: this.loginForm.get('password').value
    // }
    // this.loginService.Login(loginModel, (data) => {
    //   if(data.Error==undefined){
    //     this.loginService.PartyMastId=data.PartyMastId;
    //     if (this.horoScopeService.horoRequest != null) {
    //     this.router.navigate(["/services/paidServices"], { skipLocationChange: true });
    //     }
    //   }
    //   else{
    //     this.dialog.message=data.Error;
    //     this.dialog.open();
    //   }
    // });
    }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      //const loginModel = {
      //   MobileNo: this.loginForm.get('mobileno').value,
      //   Password: this.loginForm.get('password').value
      // }
      // this.loginService.Login(loginModel, (data) => {
      //   if(data.Error==undefined){
      //     this.loginService.PartyMastId=data.PartyMastId;
      //     if (this.horoScopeService.horoRequest != null) {
      //     this.router.navigate(["/services/paidServices"], { skipLocationChange: true });
      //     }
      //   }
      //   else{
      //     this.dialog.message=data.Error;
      //     this.dialog.open();
      //   }
      // });
  }
  signOut(): void {
    this.authService.signOut();
  }
  // onClick() {
  //   let loading = this.loadingController.create({
  //     content: 'Please wait till we get banks for you'
  //   });
  //   loading.present();
  //   this.oTPRef = this.loginService.oTPRef;
  //   const oTPModel = {
  //     MobileNo: this.loginForm.get('mobileno').value,
  //     OTPRef: this.oTPRef,
  //     OTP: this.loginForm.get('password').value
  //   }
  //   this.loginService.ValidateOTP(oTPModel);
  //   loading.dismiss();
  // }

  Login_Click() {
    // let loading = this.loadingController.create({
    //   content: 'Please wait till we get banks for you'
    // });
    // loading.present();
    
    if (this.isOTPRequested == false) {
      this.loading = true;
      const loginModel = {
        MobileNo: this.loginForm.get('mobileno').value,
        Password: this.loginForm.get('password').value
      }
      this.loginService.Login(loginModel, (data) => {
        if(data.Error==undefined){
          this.loginService.PartyMastId=data.PartyMastId;
          //   this.orderModel.PartyMastId=data.PartyMastId;
          //   if(this.orderModel!=null){
          //   this.horoScopeService.CreateOrder(this.orderModel,(data) => {
          //   this.navCtrl.push(DeliveryAddressPage,{'OrderId':data,'ItemOrdered':this.navParams.get('ItemOrdered')});  
          //   this.viewCtrl.dismiss();
          // });
          // }
          if (this.horoScopeService.horoRequest != null) {
          // this.router.navigate(["/services/paidServices", { "PartyMastId": data.PartyMastId}], { skipLocationChange: true });
          this.router.navigate(["/services/paidServices"], { skipLocationChange: true });
          //this.viewCtrl.dismiss();
          }
          //this.toastrService.successToastr('You Successfully logined.', 'Success!', { position: 'top-center' });
        }
        else{
          this.dialog.message=data.Error;
          this.dialog.open();
        }
      });

    }
    else {
      this.loading = true;
      this.oTPRef = this.loginService.oTPRef;
      const oTPModel = {
        MobileNo: this.loginForm.get('mobileno').value,
        OTPRef: this.oTPRef,
        OTP: this.loginForm.get('password').value
      }
      this.loginService.ValidateOTP(oTPModel);
    }
    this.loading = false;
    //loading.dismiss();
  }
  backClicked() {
    this._location.back();
}
  goToLoginByOTP() {
    this.isLoginByOTP = true;
  }

}

