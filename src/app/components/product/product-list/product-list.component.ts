import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/services/product.service';
import { Product } from 'app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllProductForUser()
  }

  getAllProductForUser(){
    this.productService.getAllProductsForUser().subscribe(response =>{     
      this.products=response.products  
      console.log('productos', this.products);
      
    });
  }

}
