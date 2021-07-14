import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectionComponent } from './pages/direction/direction.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileInformationComponent } from './pages/profile-information/profile-information.component';
import { QueryResultComponent } from './pages/query-result/query-result.component';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  { path: 'profile-information', component: ProfileInformationComponent },
  { path: 'direction', component: DirectionComponent },
  { path: 'query-result', component: QueryResultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
