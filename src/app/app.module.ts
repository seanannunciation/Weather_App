import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatCardModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
