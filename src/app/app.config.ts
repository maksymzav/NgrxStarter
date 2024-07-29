import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, RouterOutlet} from '@angular/router';

import {routes} from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {API_LINK} from '@data-access/shared';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule, StoreModule.forRoot([]), EffectsModule.forRoot([])),
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: API_LINK, useValue: environment.apiLink},
    provideRouter(routes),
  ]
};
