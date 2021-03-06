import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService } from 'src/app/authentication';
import { TaskGuardService } from 'src/app/task';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          page: 'home'
        }
      },
      {
        path: 'auth',
        loadChildren: '../authentication/routing-authentication.module#RoutingAuthenticationModule',
        data: {
          page: 'authentication'
        }
      },
      {
        path: 'user',
        loadChildren: '../authentication/routing-authentication.module#RoutingAuthenticationModule',
        canActivate: [AuthenticationGuardService],
        data: {
          page: 'authentication'
        }
      },
      {
        path: 'users',
        loadChildren: '../user/routing-user.module#RoutingUserModule'
      },
      {
        path: 'tasks',
        loadChildren: '../task/routing-task.module#RoutingTaskModule',
        canActivate: [AuthenticationGuardService, TaskGuardService],
//        canLoad: [ AuthenticationGuardService ],
        data: {
          page: 'task',
          roles: ['user']
        }
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: 'Not-Found'
        }
      }
    ]
  }
];
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },
/*
if (!isEmpty(taskConfiguration.self.roles)) {
  Object.assign(tasksRoutes[0], {
    data: {
      expectedRoles: taskConfiguration.self.roles
    }
  });
}
*/

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  providers: [CoreGuardService]
})
export class CoreRoutingModule { }
