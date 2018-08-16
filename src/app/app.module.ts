import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { MealpassComponent } from './mealpass/mealpass.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { appRoutes } from './routes';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { ItemService } from './_services/item.service';
import { CartComponent } from './cart/cart.component';
import { CheckOutService } from './_services/checkOut.service';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from './_services/history.service';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    OrdernowComponent,
    MealpassComponent,
    SigninComponent,
    SignupComponent,
    CartComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ModalModule .forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:5000']
      }
    })
  ],
  providers: [
    AuthService,
    AlertifyService,
    ItemService,
    CheckOutService,
    HistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
