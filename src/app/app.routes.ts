import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/non-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import(
        '../Modules/Identity/identity.presentation/login/login.component'
      ).then((m) => m.LoginComponent),
  },

  {
    path: '',
    canActivate: [authGuard], // Guard applied to all child routes
    children: [
      // {
      //   path: '',
      //   loadComponent: () =>
      //     import('./analytics/analytics.component').then(
      //       (m) => m.AnalyticsComponent
      //     ),
      // },
      // {
      //   path: 'assetsList',
      //   loadComponent: () =>
      //     import(
      //       './../Modules/assetsCrm/assetsCrm.presentation/assets-list/assets-list.component'
      //     ).then((m) => m.AssetsListComponent),
      // },
      // {
      //   path: 'asset/:id',
      //   loadComponent: () =>
      //     import(
      //       './../Modules/assetsCrm/assetsCrm.presentation/assets-list//view-assets/view-assets.component'
      //     ).then((m) => m.ViewAssetsComponent),
      // },
      {
        path: 'renters',
        loadComponent: () =>
          import(
            '../Modules/PropertyCrm/PropertyCrm.presentation/Renter/renter.component'
          ).then((m) => m.RenterComponent),
      },

      {
        path: 'categories',
        loadComponent: () =>
          import(
            '../Modules/PropertyCrm/PropertyCrm.presentation/category/category.component'
          ).then((m) => m.CategoryComponent),
      },

            {
        path: 'rentalDurations',
        loadComponent: () =>
          import(
            '../Modules/PropertyCrm/PropertyCrm.presentation/rentalDuration/rentalDuration.component'
          ).then((m) => m.RentalDurationComponent),
      },

      {
        path: 'location',
        loadComponent: () =>
          import(
            '../Modules/PropertyCrm/PropertyCrm.presentation/location/location.component'
          ).then((m) => m.LocationComponent),
      },


      
      {
        path: 'owner',
        loadComponent: () =>
          import(
            '../Modules/PropertyCrm/PropertyCrm.presentation/owner/owner.component'
          ).then((m) => m.OwnerComponent),
      },






      //       {
      //   path: 'orderassets',
      //   loadComponent: () =>
      //     import(
      //       '../Modules/assetsCrm/assetsCrm.presentation/orderasset/orderasset.component'
      //     ).then((m) => m.orderAssetComponent),
      // },
      // {
      //   path: 'studies',
      //   loadComponent: () =>
      //     import(
      //       '../Modules/assetsCrm/assetsCrm.presentation/study/study.component'
      //     ).then((m) => m.StudyComponent),
      // },
      // {
      //   path: 'projects',
      //   loadComponent: () =>
      //     import(
      //       '../Modules/assetsCrm/assetsCrm.presentation/projects/projects.component'
      //     ).then((m) => m.ProjectsComponent),
      // },
      // {
      //   path: 'locations',
      //   loadComponent: () =>
      //     import(
      //       '../Modules/assetsCrm/assetsCrm.presentation/locations/locations.component'
      //     ).then((m) => m.LocationsComponent),
      // },
      // {
      //   path: 'map',
      //   loadComponent: () =>
      //     import('./map/map.component').then((m) => m.MapComponent),
      // },
      // {
      //   path: 'adminsList',
      //   loadComponent: () =>
      //     import(
      //       './../Modules/Identity/identity.presentation/admins-list/admins-list.component'
      //     ).then((m) => m.AdminsListComponent),
      // },
      // {
      //   path: 'usersList',
      //   loadComponent: () =>
      //     import(
      //       './../Modules/Identity/identity.presentation/users-list/users-list.component'
      //     ).then((m) => m.UsersListComponent),
      // },
      {
        path: '403',
        loadChildren: () =>
          import('./error-pages/not-authorized/not-authorized.component').then(
            (m) => m.NotAuthorizedComponent
          ),
      },
      {
        path: '404',
        loadChildren: () =>
          import('./error-pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      {
        path: '500',
        loadChildren: () =>
          import(
            './error-pages/internal-server-error/internal-server-error.component'
          ).then((m) => m.InternalServerErrorComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirect unknown paths to home
];
