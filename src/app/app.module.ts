import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpBackendErrorInterceptor } from './core/interceptors/http-backend-error.interceptor';
import { FormSubmissionInterceptor } from './dynamic-form/interceptors/form-submission.interceptor';
import { HomeModule } from './pages/home/home.module';

// https://www.personio.com/

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    AuthenticationModule,
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
