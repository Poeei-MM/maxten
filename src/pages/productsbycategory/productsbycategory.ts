import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ProductsbycategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productsbycategory',
  templateUrl: 'productsbycategory.html',
})
export class ProductsByCategoryPage {

  category: any;
  productsbycategory: any[] = [];
  WooCommerce: any;
  
  constructor(public navCtrl: NavController,private network: Network, public navParams: NavParams, private WP: WoocommerceProvider, public loadingCtrl: LoadingController) {
	this.category = this.navParams.get("category");
	console.log(this.category);
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsbycategoryPage');
    if(localStorage.getItem('productsBy'+this.category.slug)) {
		let data = localStorage.getItem('productsBy'+this.category.slug);
		this.productsbycategory = JSON.parse(data);
		let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			alert('No Internet Connection! To get Update Data , Open Your Data Mode');
	  
		});
		
		let connectionCheck = this.network.onConnect().subscribe(() => {
			this.getData();
			
		});
	}
    else {
		this.productsbycategory = [];
		this.getData();
    }
  }
  
  itemTapped(event, product) {
	this.navCtrl.push('ProductDetails', {product});
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
	this.WooCommerce.getAsync("products?filter[product_cat]=" + this.category.slug).then( (data) => {
      console.log(JSON.parse(data.body));
      localStorage.setItem('productsBy'+this.category.slug, data.body);
      this.productsbycategory = JSON.parse(data.body);      
      
    }, (err) => {
      console.log(err);
    });
    
    setTimeout(() => {
		  loading.dismiss();
	    }, 3000);
	    
  }
  
}
