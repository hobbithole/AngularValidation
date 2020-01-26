import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, MatInputModule,BrowserAnimationsModule ],
  declarations: [ AppComponent, PasswordFormComponent, ProfileFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
