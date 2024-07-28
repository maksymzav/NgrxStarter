import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HomeModule} from './home/home.module';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {API_LINK} from './shared/tokens/api-link.token';
import {environment} from '../environments/environment';
import {provideHttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    HomeModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: API_LINK, useValue: environment.apiLink},
  ]
})
export class AppModule {
}
