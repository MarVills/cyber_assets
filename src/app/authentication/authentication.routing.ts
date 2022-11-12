import { Routes } from "@angular/router";
import { ForgotComponent } from "./forgot/forgot.component";
import { LoginComponent } from "./login/login.component";


export const AuthRoutes: Routes = [
    
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login',
            urls: [
            { title: 'Login', url: '/login' },
            { title: 'Login' }
            ]
        }
    },
    {
        path: 'forgot-password',
        component: ForgotComponent,
        data: {
            title: 'Forgot Password',
            urls: [
            { title: 'Forgot Password', url: '/forgot-password' },
            { title: 'Forgot Password' }
            ]
        }
    },

];