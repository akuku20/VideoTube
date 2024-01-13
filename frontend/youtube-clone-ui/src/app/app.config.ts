import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {authConfigs} from "./auth/auth-config.module";
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from "@angular/common/http";
import {provideAuth}  from "angular-auth-oidc-client";
import {VideoService} from "./video.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimations(), importProvidersFrom(VideoService),
    provideHttpClient(), provideAuth(authConfigs)]
};
