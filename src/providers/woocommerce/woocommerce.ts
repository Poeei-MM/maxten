import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;
  
  constructor() {
    console.log('Hello WoocommerceProvider Provider');
    
    this.Woocommerce = WC({
      url: "https://www.polomaxten.com",
      consumerKey: "ck_012d32107fded5ee05ed42877638ed537821e853",
      consumerSecret: "cs_ee9ec6644b1233400200b7ecd1192ce5f3290ebc",
      wpAPI: true,
      version: "wc/v1",
      queryStringAuth: true
    });
     
     this.WoocommerceV2 = WC({
      url: "https://www.polomaxten.com",
      consumerKey: "ck_012d32107fded5ee05ed42877638ed537821e853",
      consumerSecret: "cs_ee9ec6644b1233400200b7ecd1192ce5f3290ebc",
      wpAPI: true,
      version: "wc/v2",
      queryStringAuth: true
    });
     console.log(this.Woocommerce);
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }
}
