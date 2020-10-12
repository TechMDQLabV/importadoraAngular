import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private productService: ProductService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  nameInput:string;
  priceInput:string;
  descriptionInput:string;
  imageInput: File[]
  descriptionLongInput:string;
  photoSelected: string | ArrayBuffer;
  file: File;

  onAddProduct(){
    console.log('vamos agregar productos');
    console.log('imagess', this.imageInput);
    
    const product = {
      name:this.nameInput,
      price:this.priceInput,
      description:this.descriptionLongInput
    }
    console.log('tamaño',this.imageInput.length);
    
    const files =[]
    /* files.push(this.imageInput)
    console.log('files', files); */
    this.productService.saveProduct(product)
      .subscribe(response=>{               
        this.nameInput = '';
        this.priceInput='';
        this.descriptionLongInput='';
        this.descriptionInput='';
        
        document.getElementById('nameInput').focus()
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
