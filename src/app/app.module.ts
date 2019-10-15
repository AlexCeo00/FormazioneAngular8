import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// used to create fake backend
import { fakeBackendProvider } from './helpers';

import { JwtInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import { PipeorderPipe } from './table/pipeorder.pipe';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { NavbarcustomComponent } from './navbarcustom/navbarcustom.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';
import { AlertComponent } from './alert/alert.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards';
import { FormutenteComponent } from './formutente/formutente.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TableComponent,
    PipeorderPipe,
    NavbarcustomComponent,
    HomeAdminComponent,
    ParcoAutoComponent,
    AlertComponent,
    LoginComponent,
    FormutenteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'HomeAdmin', component: HomeAdminComponent },
      { path: '', component: HomeAdminComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'edit', component: FormutenteComponent },
      // { path: 'products/:productId', component: ProductDetailsComponent },
      // otherwise redirect to home
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [ // provider used to create fake backend
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
