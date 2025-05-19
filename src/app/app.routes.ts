import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: 'home'
    },

    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent
    }
];
