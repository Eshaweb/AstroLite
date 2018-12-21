import { Injectable } from "../../../node_modules/@angular/core";
import { HttpBackend, HttpClient } from "../../../node_modules/@angular/common/http";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { MaleMatchMakingRequest } from "src/Models/MatchMaking/MaleMatchMakingRequest";
import { FemaleMatchMakingRequest } from "src/Models/MatchMaking/FemaleMatchMakingRequest";


@Injectable()
export class MatchMakingService {
    ItActId = '#SM';
    malematchRequest: MaleMatchMakingRequest;
    femalematchRequest: FemaleMatchMakingRequest;

    constructor(handler: HttpBackend, public http: HttpClient, public smartHttpClient: SmartHttpClient) {
        this.http = new HttpClient(handler);
    }
    GetFreeData(matchRequest, callback: (data) => void) {
        var endPoint = "Match/GetFreeData";
        return this.smartHttpClient.Post(endPoint, matchRequest).subscribe((data: any) => {
            callback(data);
        });
    }
    getTimezone(lat, long) {
        var apiKey = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
        //https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ
        var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
        // var response = GoogleAppsScript.URL_Fetch.UrlFetchApp.fetch(url);
        // var data = JSON.parse(response.getContentText());
        // return data["timeZoneName"];
        return this.http.get(url);

    }
}