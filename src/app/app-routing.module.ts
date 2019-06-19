import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PiechartComponent } from './charts/piechart/piechart.component';
import { GraphsComponent } from './charts/graphs/graphs.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chart', component: ChartsComponent},
  { path: 'chart/piechart', component: PiechartComponent},
  { path: 'chart/barchart', component: BarchartComponent},
  { path: 'chart/graph', component: GraphsComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
