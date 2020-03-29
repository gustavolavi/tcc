import { Component, OnInit, Input } from '@angular/core';
import { IncidentService } from '../incident.service';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';
import { Incident } from '../model/incident';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {
  @Input() user: User;
  loading: boolean = true;
  incidents: Incident[] = [];

  constructor(public incident: IncidentService, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    this.getIncidents();
    this.loading = false;
  }

  getIncidents() {
    this.incidents = [];
    this.incident.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      if (!this.user.employee) {
        console.log("entrou");
        this.incidents = this.incidents.filter(item => item.user.id === this.user.id);
      }
    });
  }

  generatePdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let Incident: any[][] = [];
    Incident.push([
      { text: 'Title', bold: true },
      { text: 'Description', bold: true },
      { text: 'Status', bold: true },
      { text: 'Employee', bold: true }
    ]);

    this.incidents.forEach(i => Incident.push([
      { text: i.title },
      { text: i.description },
      { text: i.status },
      { text: i.employee ? i.employee.user.name : "" }
    ]));

    const documentDefinition = {
      content: [
        { text: `Incident`, style: 'header' },
        { text: `report incidents`, style: 'description' },
        { text: `Incidents:`, style: 'IncidentTitle' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],
            body: Incident
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 20]
        },
        author: {
          italics: true,
          margin: [0, 0, 0, 10]
        },
        description: {
          margin: [0, 0, 0, 10]
        },
        IncidentTitle: {
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download("incidentsReport");
  }

}
