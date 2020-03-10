import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentComponent } from './incident/incident.component';
import { IncidentAddComponent } from './incident-add/incident-add.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';


const routes: Routes = [
  { path: 'incidents', component: IncidentComponent, data: { title: 'Incident List' }},
  { path: 'incidents/add', component: IncidentAddComponent, data: { title: 'Incident add' }},
  { path: 'incidents/detail/:id', component: IncidentDetailComponent, data: { title: 'Incident detail' }},
  { path: '', redirectTo: '/incidents', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
