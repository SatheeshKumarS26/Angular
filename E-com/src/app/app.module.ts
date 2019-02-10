import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {AppErrorHandler} from './app-error-handler';
import { PostComponent } from './post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { PostService } from './post/post.service';
import { TableRelationComponent } from './table-relation/table-relation.component';
import { DataService } from './post/data-service.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderService } from './services/order.service';
import { MockBackend } from '@angular/http/testing';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AuthService } from './services/auth.service';
import { Authguard } from './services/authguard.service';
import { Adminauthguard } from './services/adminauthguard.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { CollapsableComponent } from './collapsable/collapsable.component';
import { ReduxTestComponent } from './redux-test/redux-test.component';
import {NgRedux, NgReduxModule} from 'ng2-redux';
import { IAppState, rootReducer, initialState } from './store';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TableRelationComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    SignupComponent,
    NoAccessComponent,
    NotFoundComponent,
    CollapsableComponent,
    ReduxTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent , canActivate: [Authguard, Adminauthguard]},
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ]),
    NgReduxModule
  ],
  providers: [
    PostService,
    AUTH_PROVIDERS,
    {provide: ErrorHandler , useClass: AppErrorHandler},
    DataService,
    OrderService,
    AuthService,
    Authguard,
    Adminauthguard,
    // For creating a mock back-end. You don't need these in a real app.
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions],
  bootstrap: [AppComponent]
})
export class AppModule {
 constructor(ngRedux: NgRedux<IAppState>) {
 ngRedux.configureStore(rootReducer, initialState);
 }
}
