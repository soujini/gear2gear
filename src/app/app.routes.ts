import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { MakeComponent } from './make/make.component';
// import { ModelComponent } from './components/model/model.component';
import { CallbackComponent } from './callback/callback.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' },
  // { path: 'model', component: ModelComponent},
];
