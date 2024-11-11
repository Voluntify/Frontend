import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './app/pages/start-page/start-page.component';
import { RegisterPageComponent } from './app/pages/register-page/register-page.component';
import { RegisterVolunteerPageComponent } from './app/pages/register-volunteer-page/register-volunteer-page.component';
import { RegisterOrganizationPageComponent } from './app/pages/register-organization-page/register-organization-page.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginPageComponent } from './app/pages/login-page/login-page.component';
import { LoginVolunteerPageComponent } from './app/pages/login-volunteer-page/login-volunteer-page.component';
import { LoginOrganizationPageComponent } from './app/pages/login-organization-page/login-organization-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: StartPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'register-volunteer', component: RegisterVolunteerPageComponent},
  { path: 'register-organization', component: RegisterOrganizationPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'login-volunteer', component: LoginVolunteerPageComponent},
  { path: 'login-organization', component: LoginOrganizationPageComponent},
  { path: 'register-volunteer', component: RegisterVolunteerPageComponent},
  { path: 'register-organization', component: RegisterOrganizationPageComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, RouterModule, MatToolbarModule, BrowserAnimationsModule), provideAnimationsAsync(), provideAnimationsAsync()]
});