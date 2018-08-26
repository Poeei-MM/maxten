import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  WooCommerce: any;
  categories: any[];
  cate: any;
  @ViewChild('categorySlides') categorySlides: Slides;
  
  constructor(public navCtrl: NavController, private WP: WoocommerceProvider,private network: Network, public loadingCtrl: LoadingController) {
	
	
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
    if(localStorage.getItem('products')) {
		let data = localStorage.getItem('products');
		let cate = JSON.parse(data);
		this.categories = [];
       
		  for(var i=0; i<cate.length; i++) {
			if((cate[i].parent == 0)) {
				this.categories.push(cate[i]);
			}
		  }
      
		let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			alert('No Internet Connection! To get Your Data , Open Your Data Mode');
	  
		});
		
		let connectionCheck = this.network.onConnect().subscribe(() => {
			this.getData();
			
		});
	}
    else {
		this.categories = [];
		this.getData();
    }
  }
  
  itemTapped(event, category) {
	this.navCtrl.push('ProductsByCategoryPage', {category});
  }
  
  refresher(refresher) {
	this.getData();
	setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  
  getData() {
    
	let loading = this.loadingCtrl.create();
	loading.present();
	    
    this.WooCommerce = this.WP.init();
	this.WooCommerce.getAsync("products/categories?per_page=100").then( (data) => {
      console.log(JSON.parse(data.body));
      let cate = JSON.parse(data.body);
      localStorage.setItem('products', data.body);
      this.categories = [];
       
      for(var i=0; i<cate.length; i++) {
		if((cate[i].parent == 0)) {
			this.categories.push(cate[i]);
		}
      }
      console.log(this.categories);
    }, (err) => {
      console.log(err);
    });
    
    setTimeout(() => {
		  loading.dismiss();
	    }, 3000);
	    
  }
}
