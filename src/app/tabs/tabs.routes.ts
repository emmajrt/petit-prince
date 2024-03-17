import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'articles',
        loadComponent: () =>
          import('../articles/articles.page').then(m => m.ArticlesPage),
      },
      {
        path: 'galeries',
        loadComponent: () =>
          import('../galeries/galeries.page').then(m => m.GaleriesPage),
      },
      {
        path: 'dates',
        loadComponent: () =>
          import('../dates/dates.page').then(m => m.DatesPage),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('../contact/contact.page').then(m => m.ContactPage),
      }
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'tutorial',
    loadComponent: () => import('../tutorial/tutorial.page').then( m => m.TutorialPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

