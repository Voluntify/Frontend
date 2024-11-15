import { bootstrapApplication } from '@angular/platform-browser';
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
import { MainPageComponent } from './app/pages/main-page/main-page.component';
import { VolunteersPageComponent } from './app/pages/volunteers-page/volunteers-page.component';
import { OrganizationsPageComponent } from './app/pages/organizations-page/organizations-page.component';
import { ProfileVolunteerPageComponent } from './app/pages/profile-volunteer-page/profile-volunteer-page.component';
import { CertificatesPageComponent } from './app/pages/certificates-page/certificates-page.component';
import { SettingsVolunteerPageComponent } from './app/pages/settings-volunteer-page/settings-volunteer-page.component';
import { ProfileOrganizationPageComponent } from './app/pages/profile-organization-page/profile-organization-page.component';
import { OrganizationPageComponent } from './app/pages/organization-page/organization-page.component';
import { VolunteerSelectedPageComponent } from './app/pages/volunteer-selected-page/volunteer-selected-page.component';
import { RegistrationFormPageComponent } from './app/pages/registration-form-page/registration-form-page.component';

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
  { path: 'register-organization', component: RegisterOrganizationPageComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'volunteers', component: VolunteersPageComponent},
  { path: 'organizations', component: OrganizationsPageComponent},
  { path: 'profile-volunteer', component: ProfileVolunteerPageComponent},
  { path: 'profile-organization', component: ProfileOrganizationPageComponent},
  { path: 'certificates', component: CertificatesPageComponent},
  { path: 'settings-volunteer', component: SettingsVolunteerPageComponent},
  { path: 'volunteer-selected-page', component: VolunteerSelectedPageComponent},
  { path: 'registrarion-form-page', component: RegistrationFormPageComponent},
  { path: 'organization-page', component: ProfileOrganizationPageComponent},
  { path: 'organization', component: OrganizationPageComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, RouterModule, MatToolbarModule, BrowserAnimationsModule), provideAnimationsAsync(), provideAnimationsAsync()]
});