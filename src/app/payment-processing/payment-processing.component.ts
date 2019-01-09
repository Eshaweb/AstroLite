import { Component, OnInit } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {
  ShowMessage: string;
  enableDownload: boolean;
  enableRefresh: boolean;
  buttonName: string;
  buttonId: any;
  loading: boolean;

  constructor(public horoScopeService: HoroScopeService) {
    this.enableDownload = true;
    if (this.horoScopeService.resultResponse.Refresh == true) {
      this.enableRefresh = true;
      this.enableDownload = false;
      this.buttonName = 'Click Refresh';
    }
    else {
      this.enableRefresh = false;
      this.enableDownload = true;
      this.buttonName = this.horoScopeService.resultResponse.AstroReportId[0];
    }
  }
  Refresh_Click() {
    this.loading=true;
    this.horoScopeService.CheckForResult(this.horoScopeService.OrderId, (data) => {
      if (data.AstroReportId.length != 0) {
        this.enableRefresh = false;
        this.enableDownload = true;
        this.buttonName = data.AstroReportId[0].split('_')[1];
        this.buttonId = data.AstroReportId[0].split('_')[0];
      }
      else {
        this.enableRefresh = true;
        this.enableDownload = false;
        this.buttonName = 'Click Refresh';
      }
      this.loading=false;
    });
  }
  ngOnInit() {

  }
  Download_Click() {
    this.loading=true;
    this.horoScopeService.DownloadResult(this.buttonId, (data) => {
      var newBlob = new Blob([data], { type: "application/pdf" });
      const fileName: string = 'FullHoroscope.pdf';
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      var url = window.URL.createObjectURL(newBlob);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.loading=false;
    });

    // var FreePDF = {
    //   OrderId: this.horoScopeService.OrderId.toString()
    // }
    // this.horoScopeService.ProcessOrder(FreePDF).subscribe((data: any) => {
    //     var newBlob = new Blob([data], { type: "application/pdf" });
    //     const fileName: string = 'FullHoroscope.pdf';
    //     const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    //     var url = window.URL.createObjectURL(newBlob);
    //     a.href = url;
    //     a.download = fileName;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     URL.revokeObjectURL(url);
    //     this.isLoading=false;
    // });   
  }
}
