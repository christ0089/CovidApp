import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage,
        children: [
          { path: 'main-feed', loadChildren: () => import('../main-feed/main-feed.module').then( m => m.MainFeedPageModule)},
          { path: 'temperature', loadChildren: () => import('../temperature/temperature.module').then( m => m.TemperaturePageModule)},
          { path: 'faq',  loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)},
          {
            path: 'map',
            loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
          },
        ]
      },
    ])
  ],
  declarations: [TabsPage],
  providers: [ ]
})
export class TabsPageModule {}
