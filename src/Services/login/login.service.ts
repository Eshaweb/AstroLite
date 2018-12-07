import { Injectable } from "@angular/core";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { HttpClient } from "../../../node_modules/@angular/common/http";



@Injectable()
export class LoginService {
    oTPRef: any;
    Name: any;
    Token: any;
    PartyMastId: any;

    constructor(public http: HttpClient, public smartHttpClient: SmartHttpClient) {

    }
    GetOTP(MobileNo) {
        var endPoint = "Party/GetOTP";
        var data = "MobileNo=" + MobileNo;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            this.oTPRef = data;

        });
    }
    ValidateOTP(oTPModel) {
        var endPoint = "Party/ValidateOTP";
        this.smartHttpClient.Post(endPoint, oTPModel).subscribe((data: any) => {
            var bbb = data;
        });
    }
    Login(loginModel,callback: (data) => void) {
        var endPoint = "Party/Login";
        this.smartHttpClient.Post(endPoint, loginModel).subscribe((data: any) => {
            this.Name=data.Name;
            this.Token=data.Token;
            this.PartyMastId=data.PartyMastId;
            localStorage.setItem('Name',this.Name);
            //this.events.publish('REFRESH_NAME');
            callback(data);
        }, (error) => {
            // var alert = this.alertCtrl.create({
            //     title: "Error Message",
            //     subTitle: error,
            //     buttons: ['OK']
            // });
            // alert.present();   
        });
    }
    getPhoneNumberFromFacebookAccount() {
        //var ACCESS_TOKEN = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
        //var url = 'http://www.facebook.com/dialog/oauth?client_id=1123555431133200&&nbsp&nbsp&nbsp&nbsp redirect_uri=http://localhost:8100/#/home&scope=user_mobile_phone,user_address'
        var url='https://graph.facebook.com/me?access_token=ACCESS_TOKEN';
        return this.http.get(url);

    }
}


