import { Injectable } from "@angular/core";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { SalesResponse } from "../../Models/Sales/SalesResponse";
import { PartyResponse } from "../../Models/Party/PartyResponse";





@Injectable()
export class RegistrationService {

    constructor(public smartHttpClient: SmartHttpClient) {

    }
    RegisterParty(RegisterModel,callback: (data) => void) {
        var endPoint = "Party/RegisterParty";
        this.smartHttpClient.Post(endPoint, RegisterModel).subscribe((data: any) => {
            let yyy = data as PartyResponse;
            if (yyy == null) {
                console.log("ghfg");
                callback(data);
            }

        }, (error) => {
            if (typeof error === 'string') {
                
            }

        });
    }
}
