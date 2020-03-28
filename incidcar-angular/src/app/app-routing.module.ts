import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentComponent } from './incident/incident.component';
import { IncidentAddComponent } from './incident-add/incident-add.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { ProcessAddComponent } from './process/process-add/process-add.component';
import { ProcessListComponent } from './process/process-list/process-list.component';
import { ProcessDetailComponent } from './process/process-detail/process-detail.component';
import { HomeComponent } from './public/home/home.component';
import { UserAddComponent } from './user/user-add/user-add.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' }},
  { path: 'incidents', component: IncidentComponent, data: { title: 'Incident List' }},
  { path: 'incidents/add', component: IncidentAddComponent, data: { title: 'Incident add' }},
  { path: 'incidents/add/:id', component: IncidentAddComponent, data: { title: 'Incident add' }},
  { path: 'incidents/:id', component: IncidentDetailComponent, data: { title: 'Incident detail' }},
  { path: 'processes', component: ProcessListComponent, data: { title: 'Process List' }},
  { path: 'processes/add', component: ProcessAddComponent, data: { title: 'Process add' }},
  { path: 'processes/add/:id', component: ProcessAddComponent, data: { title: 'Process add' }},
  { path: 'processes/:id', component: ProcessDetailComponent, data: { title: 'Process detail' }},
  { path: 'create', component: UserAddComponent, data: { title: 'User add' }},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
