import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { TapListComponent } from './tap/tap-list/tap-list.component';
import { TapDetailsComponent } from './tap/tap-details/tap-details.component';
import { AddTapComponent } from './tap/add-tap/add-tap.component';
import { LogComponent } from './log/log.component';
import { StatsComponent } from './stats/stats.component';
import { UsersDetailsComponent } from './manage-users/users-details/users-details.component';
import { UsersListComponent } from './manage-users/users-list/users-list.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'logs', component: LogComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'drink', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'taps', component: TapListComponent },
  { path: 'taps/:id', component: TapDetailsComponent },
  { path: 'add', component: AddTapComponent },
  { path: 'manage-users', component: UsersListComponent },
  { path: 'manage-users/:id', component: UsersDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }