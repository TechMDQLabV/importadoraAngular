import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/models/Product';
import { ProductService } from 'app/services/product.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private _route: ActivatedRoute) { }

  product: Product = new Product()
  productAddForm: FormGroup;

  ngOnInit(): void {
    this.product.name='' //
    this.product.description='',//
    this.product.minAmount=0,//
    this.product.productDenomination='',//
    this.product.packingDimensions='',//
    this.product.long_description='',//
    this.product.shippingWay='',//
    this.product.loadingPort='',//
    this.product.estimatedPrice=0 //
    this.productAddForm = new FormGroup({
      'name': new FormControl(this.product.name,{validators: [Validators.required]}),
      'description': new FormControl(this.product.description,{validators: [Validators.required]}),
      'minAmount': new FormControl(this.product.minAmount,{validators: [Validators.required]}),
      'productDenomination': new FormControl(this.product.productDenomination,{validators: [Validators.required]}),
      'packingDimensions': new FormControl(this.product.packingDimensions,{validators: [Validators.required]}),
      'long_description': new FormControl(this.product.long_description,{validators: [Validators.required]}),
      'shippingWay': new FormControl(this.product.shippingWay,{validators: [Validators.required]}),
      'loadingPort': new FormControl(this.product.loadingPort,{validators: [Validators.required]}),
      'estimatedPrice': new FormControl(this.product.estimatedPrice,{validators: [Validators.required]})      
    });
  }

  get name(){return this.productAddForm.get('name')}
  get description(){return this.productAddForm.get('description')}
  get minAmount(){return this.productAddForm.get('minAmount')}
  get productDenomination(){return this.productAddForm.get('productDenomination')}
  get packingDimensions(){return this.productAddForm.get('packingDimensions')}
  get long_description(){return this.productAddForm.get('long_description')}
  get shippingWay(){return this.productAddForm.get('shippingWay')}
  get loadingPort(){return this.productAddForm.get('loadingPort')}
  get estimatedPrice(){return this.productAddForm.get('estimatedPrice')}
  
  

  imageInput: File[]  
  file: File;

  onAddProduct(){
    console.log('vamos agregar productos');
    console.log('imagess', this.imageInput);
    
    const product = new Product()
    product.name=this.name.value
    product.description=this.description.value
    product.minAmount=this.minAmount.value
    product.productDenomination=this.productDenomination.value
    product.packingDimensions=this.packingDimensions.value
    product.long_description=this.long_description.value
    product.shippingWay=this.shippingWay.value
    product.loadingPort=this.loadingPort.value
    product.estimatedPrice=this.estimatedPrice.value



    this.productService.saveProduct(product)
      .subscribe(()=>{   
        alert("Alta Exitosa!");
        this.router.navigateByUrl("/productos");
      }, error => {
        alert('Error: ' + error.error.errors.name)
        document.getElementById('nameInput').focus()
      })  
    
  }

 
  seleccionarArchivo(event) {
    console.log('event',event.target.files);
    
    /* var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    } */
  }

}
