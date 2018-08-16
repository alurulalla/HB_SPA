import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MealpassComponent } from './mealpass/mealpass.component';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HistoryComponent } from './history/history.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'mealpass', component: MealpassComponent },
    { path: 'ordernow', component: OrdernowComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'history', component: HistoryComponent }
];
