import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SocketComponent } from './socket.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SocketioService } from './_services/socketio.service';
import { AddTapComponent } from './tap/add-tap/add-tap.component';
import { TapDetailsComponent } from './tap/tap-details/tap-details.component';
import { TapListComponent } from './tap/tap-list/tap-list.component';
import { DrinkComponent } from './drink/drink.component';
@NgModule({
  declarations: [
    AppComponent,
    SocketComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AddTapComponent,
    TapDetailsComponent,
    TapListComponent,
    DrinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
