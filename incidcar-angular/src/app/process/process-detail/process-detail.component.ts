import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/model/process';
import { User } from 'src/app/model/user';
import { IncidentService } from 'src/app/incident.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {

  user: User = { email: '', id: 0, name: '', password: '', username: '' };
  process: Process = { id: 0, title: '', description: '',tasks:[] };
  
  constructor(
    public rest: IncidentService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { 
  }

  ngOnInit() {
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    else
      this.router.navigate(['']);
      
    if (this.route.snapshot.params['id']) {
      this.rest.getProcess(this.route.snapshot.params['id']).subscribe((data: Process) => {
        this.process = data;
      });
    }
  }

  generatePdf(){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let listTak: any[][] =[];
    listTak.push([
      { text: 'Title', bold: true },
      { text: 'Description', bold: true },
      { text: 'IsActive', bold: true } ,
      { text: 'State', bold: true }
    ]);

    this.process.tasks.forEach(i => listTak.push([
      { text: i.name },
      { text: i.description },
      { text: i.ativo },
      { text: i.state }
    ]));

    const documentDefinition =  {
      info: {
        title: this.process.title,
        author: 'Gustavo Laviola',
        subject: this.process.title,
        keywords: this.process.title,
        },
      content: [
        { text:`Process: ${this.process.title}`, style: 'header' },
        { text:`Manager: ${this.process.manager.user.name}`, style: 'author' },
        { text:`Description: ${this.process.description}`, style: 'description' },
        { text:`Tasks:`, style: 'taskTitle' },
        {  table: {
          headerRows: 1,
          widths: [ '*', 'auto', 100, '*' ],
          body: listTak
        }}
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
        taskTitle: {
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download(this.process.title);
  }
}
