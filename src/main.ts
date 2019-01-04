import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './icons';
import { ApplicationRef } from "@angular/core";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableDebugTools } from "@angular/platform-browser";

platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
  let applicationRef = module.injector.get(ApplicationRef);
  let appComponent = applicationRef.components[0];
  enableDebugTools(appComponent);
});
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
