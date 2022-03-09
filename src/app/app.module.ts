import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { HttpBackendErrorInterceptor } from './core/interceptors/http-backend-error.interceptor';
import { FormSubmissionInterceptor } from './dynamic-form/interceptors/form-submission.interceptor';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';

// https://www.personio.com/

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    CoreModule,
    NavigationModule,
    SharedModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FormSubmissionInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBackendErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// TODO: spinner loader in lists
