//import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";



@Injectable()
export class ErrorHandlingService {
    constructor() {

    }
    ErrorHandler(controls, ErrorProperties) {
        for (const property in ErrorProperties) {
            for (const name in controls) {
                if (name == property) {
                    ErrorProperties[property].forEach((value: string) => {
                        document.getElementById('err_' + property).innerHTML = value;           
                    });
                }
                // else if (property == 'Errors') {
                //     for (var i = 0; i < ErrorProperties.Errors.length; i++) {
                //         var errorMessage = ErrorProperties.Errors[i].ErrorString;
                //         this.toastrService.error(errorMessage, 'Error!');
                //         var alert = this.alertCtrl.create({
                //             title: "Error Message",
                //             subTitle: errorMessage,
                //             buttons: ['OK']
                //         });
                //         alert.present();
                //     }
                // }
            }
        }
    }
}