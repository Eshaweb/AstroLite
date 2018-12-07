import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators'
import { LoaderService } from '../loader.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { SalesResponse } from '../../../Models/Sales/SalesResponse';
import { Error, Errors } from '../../../Models/Error';
import { map } from 'rxjs/operator/map';
import { SalesModel } from '../../../Models/Sales/SalesModel';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}


export function applicationHttpClientCreator(http: HttpClient, loaderService: LoaderService) {
  return new SmartHttpClient(http, loaderService);
}

@Injectable()
export class SmartHttpClient {

  private api = 'https://astroliteapi.azurewebsites.net/api/';
  salesResponse: SalesResponse;
  xxx: any;
  // private api = 'https://www.igniteui.com/api/';

  // Extending the HttpClient through the Angular DI.
  // public constructor(public alertCtrl: AlertController, public http: HttpClient, private loaderService: LoaderService) {
    public constructor(public http: HttpClient, private loaderService: LoaderService) {
  // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.api + endPoint, options).catch(this.handleError);
  }


  error: Error[]

  // public GetPayCodes<T>(): Observable<T> {
  //   return this.http.get<T>(this.api + "Sales/GetPayCodes");
  // }

  /**
   * GET request By Id
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public GetById<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.api + endPoint + "?" + params, options).catch(this.handleError);
  }


  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    // this.showLoader();
    // return this.http.post<T>(this.api + endPoint, params, options).pipe( finalize(()=>{
    //   //this.hideLoader();
    // }));
    return this.http.post<T>(this.api + endPoint, params, options).pipe(finalize(() => {
    })).pipe(tap((data: any) => {
      // if (this.instanceOfError(data)) {
      //   alert((data as Error).ErrorString);
      // }
      //   this.xxx=data[0];
      //  this.uuu(this.xxx);
    })
      // retry(3),
      // catchError(this.handleError); 
    ).catch(this.handleError);
  }

  // instanceOfError(object: any): object is Error {
  //   return 'Type' in object;
  // }
  private handleErrorOld(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error}`; 
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    // var alert = this.alertCtrl.create({
    //   title: "Error Message",
    //   subTitle: errorMessage,
    //   buttons: ['OK']
    // });
    // alert.present();
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {

    return this.http.put<T>(this.api + endPoint, params, options).catch(this.handleError);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.api + endPoint, options).catch(this.handleError);
  }
 


  private showLoader(): void {
    this.loaderService.show();
    console.log('shown');
  }
  private hideLoader(): void {
    this.loaderService.hide();
    console.log('hided');
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = null;
    if (err.status == 401) {
        errorMessage = 401;
        // this.SetRefreshTokenNeeded();
        // var RefreshToken=localStorage.getItem('refreshToken');
        // this.GetToken(RefreshToken).subscribe((data: any) => {
        //     this.SetToken(data.AccessToken);
        //     this.RefreshToken = data.RefreshToken;
        //     StorageService.SetItem('refreshToken', this.RefreshToken);
        // });
    }
    else if (err.status == 0) {
        errorMessage = 'Internal Server Error';
        console.clear();
    }
    else if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error}`;
    }
    else if (err == null || err == undefined) {
        errorMessage = 'Network Error';
    }
    else {
        if (err.error != null) {
            if (typeof err.error === 'string') {
                errorMessage = err.error;
            }
            // else if (err.error instanceof ErrorFromServer) {
            //     //err.error.find(x => x.username == '2');
            // }
            else if (err.error.Errors != undefined) {
                for (var i = 0; i < err.error.Errors.length; i++) {
                    errorMessage = err.error.Errors[i].ErrorString;
                }
            }
            else {  
                errorMessage = err.error;
            }
        }
        else {
            errorMessage = 'Network Error';
        }
    }
    
    console.log(errorMessage);
    // if (errorMessage != '') {
    if (errorMessage != null) {
        return Observable.throw(errorMessage);
    } else {
        return Observable.throw(err);
    }
}

}


/**https://medium.com/@admin_87321/extending-angular-httpclient-6b33a7a1a4d0 */