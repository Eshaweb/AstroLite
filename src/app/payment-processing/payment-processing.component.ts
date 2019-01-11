import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit, OnDestroy {
  ShowMessage: string;
  enableDownload: boolean;
  enableRefresh: boolean;
  buttonName: string;
  buttonId: any;
  loading: boolean;
  sub: any;

  constructor(public router: Router, public horoScopeService: HoroScopeService) {
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
    this.loading = true;
    
  }
  ngOnInit() {
    this.loading = true;
    this.horoScopeService.CheckForResult(this.horoScopeService.OrderId, (data) => {
      if (data.AstroReportId.length != 0) {
        this.enableRefresh = false;
        this.enableDownload = true;
        this.buttonName = data.AstroReportId[0].split('_')[1];
        this.buttonId = data.AstroReportId[0].split('_')[0];
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
          this.loading = false;
        });
      }
      else {
        this.enableRefresh = true;
        this.enableDownload = false;
        this.buttonName = 'Click Refresh';
        this.sub=Observable.interval(10000).subscribe((val) =>{
          this.horoScopeService.CheckForResult(this.horoScopeService.OrderId, (data) => {
            if (data.AstroReportId.length != 0) {
              this.enableRefresh = false;
              this.enableDownload = true;
              this.buttonName = data.AstroReportId[0].split('_')[1];
              this.buttonId = data.AstroReportId[0].split('_')[0];
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
                this.loading = false;
                this.sub.unsubscribe();
              });
            }
            else {
              this.enableRefresh = true;
              this.enableDownload = false;
              this.buttonName = 'Click Refresh';
            }
          });
        });
       
      }
    });
    this.horoScopeService.birthDateinDateFormat=new Date();
    this.horoScopeService.birthTimeinDateFormat=null;
    this.horoScopeService.birthplace='';
    this.horoScopeService.horoRequest = {
      Name: '',
      Father: '',
      Mother: '',
      Gothra: '',
      Date: null,
      Time: null,
      Place: '',
      TimeFormat: '',
      LatDeg: null,
      LatMt: null,
      LongDeg: null,
      LongMt: null,
      NS: '',
      EW: '',
      ZH: null,
      ZM: null,
      PN: '',
      Gender: '',
      LangCode: '',
      ReportType: '',
      ReportSize: '',
      IsMarried: null,
      FormParameter: '',
      Swarna: null,
      Pruchaka: null,
      JanmaRashi: null,
      AshtaMangalaNo: '',
    }
  }
  public onDialogOKSelected(event) {
    event.dialog.close();
  }
  ngOnDestroy(): void {
    //window.history.go(-1);
    // this.router.navigate(['/services/#SH']);
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  Download_Click() {
    this.loading = true;
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
      this.loading = false;
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
