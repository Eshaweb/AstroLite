import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { EventsService } from '../../../../node_modules/angular4-events';
import { OrderModel } from '../../../Models/HoroScope/OrderModel';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { HoroScopeService } from '../../../Services/HoroScopeService/HoroScopeService';
import { LoginService } from '../../../Services/login/login.service';
import { UIService } from '../../../Services/UIService/ui.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '../../../../node_modules/angularx-social-login';


@Component({
    selector: 'app-login-demo',
    templateUrl: './loginDemo.component.html',
    styleUrls: ['./loginDemo.component.scss']
})
export class LoginDemoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  isLoading: boolean=false;

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

  constructor(private events:EventsService, private route: ActivatedRoute, private router: Router, public http: HttpClient, 
    private authService: AuthService, public horoScopeService: HoroScopeService, private loginService: LoginService, 
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
  }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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

  onClick() {
    // let loading = this.loadingController.create({
    //   content: 'Please wait till we get banks for you'
    // });
    // loading.present();
    if (this.isOTPRequested == false) {
      const loginModel = {
        MobileNo: this.loginForm.get('mobileno').value,
        Password: this.loginForm.get('password').value
      }
      this.loginService.Login(loginModel, (data) => {
        //   this.orderModel.PartyMastId=data.PartyMastId;
        //   if(this.orderModel!=null){
        //   this.horoScopeService.CreateOrder(this.orderModel,(data) => {
        //   this.navCtrl.push(DeliveryAddressPage,{'OrderId':data,'ItemOrdered':this.navParams.get('ItemOrdered')});  
        //   this.viewCtrl.dismiss();
        // });
        // }
        if (this.horoInfo != null) {

        //   this.navCtrl.push(ServiceInfoPage, { 'PartyMastId': data.PartyMastId, 'HoroInfo': this.navParams.get('HoroInfo') });
        this.router.navigate(["/horoscopePaid", { "PartyMastId": data.PartyMastId, 'HoroInfo': this.horoInfo}]);

        //this.viewCtrl.dismiss();
        }
      });

    }
    else {
      this.oTPRef = this.loginService.oTPRef;
      const oTPModel = {
        MobileNo: this.loginForm.get('mobileno').value,
        OTPRef: this.oTPRef,
        OTP: this.loginForm.get('password').value
      }
      this.loginService.ValidateOTP(oTPModel);
    }
    //loading.dismiss();
  }

  goToLoginByOTP() {
    this.isLoginByOTP = true;
  }
}

