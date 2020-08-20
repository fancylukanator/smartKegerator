import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

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
import { LogComponent } from './log/log.component';
import { StatsComponent } from './stats/stats.component';
import { UsersListComponent } from './manage-users/users-list/users-list.component';
import { UsersDetailsComponent } from './manage-users/users-details/users-details.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
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
    LogComponent,
    StatsComponent,
    UsersListComponent,
    UsersDetailsComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [authInterceptorProviders, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
