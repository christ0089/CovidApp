import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainFeedPageRoutingModule } from './main-feed-routing.module';

import { MainFeedPage } from './main-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainFeedPageRoutingModule
  ],
  declarations: [MainFeedPage]
})
export class MainFeedPageModule {}
