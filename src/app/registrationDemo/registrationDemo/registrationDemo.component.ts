import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Location } from "@angular/common";
import { UIService } from '../../../Services/UIService/ui.service';
import { RegistrationService } from '../../../Services/registration/registration.service';
import { IgxCircularProgressBarComponent } from '../../../../node_modules/igniteui-angular';


@Component({
    selector: 'app-registration-demo',
    templateUrl: './registrationDemo.component.html',
    styleUrls: ['./registrationDemo.component.scss']
})
export class RegistrationDemoComponent implements OnInit, OnDestroy, AfterViewInit {
    public currentValue: number;
    public interval: any;
    @ViewChild(IgxCircularProgressBarComponent) public circularBar: IgxCircularProgressBarComponent;
    public maxvalue: number;
    public changeIcon() {
        return this.interval ? "pause" : "play_arrow";
      }
      public tick() {
        this.currentValue = 0;
        if (this.interval) {
            this.interval = clearInterval(this.interval);
            return;
        }
        this.interval = setInterval(this.updateValue.bind(this), 60);
      }
      public updateValue() {
        this.circularBar.updateProgressSmoothly(this.currentValue += this.randomIntFromInterval(1, 3), 1);
        if (this.circularBar.value > this.circularBar.max + 3) {
          this.interval = clearInterval(this.interval);
        }
     }
      public progresChanged(progress) { 
          
      }
      private randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    registrationForm: FormGroup;
    mobilenoMessage: string;
    emailMessage: string;
    passwordMessage: string;
    confirm_PasswordMessage: string;
    refCodeMessage: string;
    isLoading: boolean;

    constructor(public uiService: UIService, private registrationService: RegistrationService,
        private route: ActivatedRoute, private _location: Location,
        private router: Router, private formBuilder: FormBuilder) {

        this.registrationForm = this.formBuilder.group({
            mobileno: [8660506866, [Validators.required, Validators.minLength(10)]],
            email: ['shailesh@gmail.com', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
            password: ['Auto@123', [Validators.required, Validators.minLength(4)]],
            confirm_Password: ['Auto@123', [Validators.required, Validators.minLength(4)]],
            refCode: ['', [Validators.minLength(6)]]
        }, { validator: this.matchingPasswords });

        const mobilenoContrl = this.registrationForm.get('mobileno');
        mobilenoContrl.valueChanges.subscribe(value => this.setErrorMessage(mobilenoContrl));

        const emailContrl = this.registrationForm.get('email');
        emailContrl.valueChanges.subscribe(value => this.setErrorMessage(emailContrl));

        const passwordControl = this.registrationForm.get('password');
        passwordControl.valueChanges.subscribe(value => this.setErrorMessage(passwordControl));

        const confirm_PasswordControl = this.registrationForm.get('confirm_Password');
        confirm_PasswordControl.valueChanges.subscribe(value => this.setErrorMessage(confirm_PasswordControl));

        const refCodeControl = this.registrationForm.get('refCode');
        refCodeControl.valueChanges.subscribe(value => this.setErrorMessage(refCodeControl));
    }
    setErrorMessage(c: AbstractControl): void {
        let control = this.uiService.getControlName(c);
        document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
            document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
        }
    }
    private validationMessages = {
        mobileno_required: 'Enter Mobile No',
        mobileno_minlength: 'Minimum length should be 10',

        email_required: 'Enter EMail',
        email_minlength: 'Minimum length should be 6',
        email_pattern: 'Do not match with EMail pattern',

        password_required: 'Enter Password',
        password_minlength: 'Minimum length should be 3',

        confirm_Password_required: 'Re-Enter Password',
        confirm_Password_minlength: 'Minimum length should be 3',

        refCode_minlength: 'Minimum length should be 6'

    };
    matchingPasswords(group: FormGroup) { // here we have the 'passwords' group
        let password = group.controls.password.value;
        let confirmpwd = group.controls.confirm_Password.value;
        if (!password || !confirmpwd) {
            return null;
        }
        return password === confirmpwd ? null : { notSame: true }
    }
    Register_Click() {
        this.isLoading=true;
        this.tick();
        var registerModel = {
            Mobile: this.registrationForm.get('mobileno').value,
            EMail: this.registrationForm.get('email').value,
            Password: this.registrationForm.get('password').value,
            IntroParty: this.registrationForm.get('refCode').value
        }
        this.maxvalue=100;
        this.registrationService.RegisterParty(registerModel, (data) => {
            //this.toastrService.success('OTP Sent to with Reference No. ', 'Success!');
        
        });
    }
    ngOnInit(): void {
        /*
        */
    }
    backClicked() {
        this._location.back();
    }
    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

}

