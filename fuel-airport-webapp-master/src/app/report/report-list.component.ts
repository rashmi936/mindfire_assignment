import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '@app/_services';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({ templateUrl: 'report-list.component.html' })
export class ReportListComponent implements OnInit {
    airportReports = null;
    fuelReport = null;

    

    @ViewChild('Fuelcontent') Fuelcontent: ElementRef;
    @ViewChild('airportcontent') airportcontent: ElementRef;

    constructor(private reportService : ReportService) {}

    ngOnInit() {
        this.reportService.airport().subscribe((report:any) =>{
            this.airportReports = report.data;
        } );

        this.reportService.fuel().subscribe((report:any) =>{
            this.fuelReport = report.data;
        } );

    }


    


      makeAirportPdf()
  {
    let data = document.getElementById('MyDiv');  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      let pdf = new jspdf('p', 'cm', 'a4');  
      //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Filename.pdf');   
    }); 
  }
    


  makeFuelPdf()
  {
    let data = document.getElementById('FuelPdf');  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      let pdf = new jspdf('p', 'cm', 'a4');  
      //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('FuelPdf.pdf');   
    }); 
  }
}