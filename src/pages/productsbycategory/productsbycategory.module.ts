import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsByCategoryPage } from './productsbycategory';

@NgModule({
  declarations: [
    ProductsByCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsByCategoryPage),
  ],
})
export class ProductsByCategoryPageModule {}
