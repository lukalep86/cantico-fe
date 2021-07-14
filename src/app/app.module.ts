import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Pages Component
import { AppComponent } from './app.component';
// Component
import { ProfileInformationComponent } from './pages/profile-information/profile-information.component';
import { DirectionComponent } from './pages/direction/direction.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { QueryResultComponent } from './pages/query-result/query-result.component';
// Third Parts
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    ProfileInformationComponent,
    DirectionComponent,
    HomePageComponent,
    LoginComponent,
    QueryResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
