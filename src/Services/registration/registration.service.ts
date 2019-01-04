import { Injectable } from "@angular/core";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { SalesResponse } from "../../Models/Sales/SalesResponse";
import { PartyResponse } from "../../Models/Party/PartyResponse";
import { ToastrManager } from 'ng6-toastr-notifications';





@Injectable()
export class RegistrationService {
    errorMessage: any;
    isLoading: boolean;

    constructor(public toastrService: ToastrManager, public smartHttpClient: SmartHttpClient) {

    }
    RegisterParty(RegisterModel,callback: (data) => void) {
        var endPoint = "Party/RegisterParty";
        this.smartHttpClient.Post(endPoint, RegisterModel).subscribe((data: any) => {
            let yyy = data as PartyResponse;
            //this.toastrService.successToastr('You Successfully registered.', 'Success!');
            if(data.Errors!=undefined){
                this.isLoading = false;
                this.errorMessage=data.Errors[0].ErrorString;
                callback(data);
            }
            else{
                this.errorMessage=null;
                this.isLoading = true;
                callback(data);
            }

        }, (error) => {
            if (typeof error === 'string') {
                this.toastrService.successToastr('You Successfully registered.', 'Success!');
            }

        });
    }
}
