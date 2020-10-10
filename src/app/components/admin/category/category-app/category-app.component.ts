import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/models/Category';
import { CaregoryServiceService } from 'app/services/caregory-service.service';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'app-category-app',
  templateUrl: './category-app.component.html',
  styleUrls: ['./category-app.component.css']
})
export class CategoryAppComponent implements OnInit {

  constructor(private categoryService: CaregoryServiceService, private tagService: TagService, private router: Router) { }
  nameInput:string;
  idInput:number;
  categorias: Category[] = [];
  buttonSave: boolean = true
  ngOnInit(): void {
    this.getAll()
  }
  onAddcategory(){
    let category = new Category(this.nameInput);
    this.categoryService.saveCategory(category)
      .subscribe(response=>{               
        this.nameInput = '';
        this.getAll()
        document.getElementById('nameInput').focus()
      }, error => {
        console.error(error.error.errors)
        alert('Error: ' + error.error.errors.name)
        document.getElementById('nameInput').focus()
      })      
  }
  onChangeStatus(e){
    this.categoryService.changeStatus(e).subscribe(response =>{
      this.getAll()
    })
    
  }
  getAll(){
    this.categoryService.getAllCategory().subscribe( response => {
      return this.categorias =response
    })
  }
  onUpdate(category){
    this.nameInput= category.name
    this.idInput=category.id
    this.buttonSave = false 
    document.getElementById('nameInput').focus()
  }
  onButtonAdd(){
    this.nameInput= ' '
    this.idInput= null
    this.buttonSave = true
    document.getElementById('nameInput').focus()
  }

  update(){
    let category = new Category(this.nameInput);
    this.categoryService.updateCategory(this.idInput,category)
      .subscribe(response=>{               
        this.onButtonAdd()
        this.getAll()
      }, error => {
        console.error(error.error.errors)
        alert('Error: ' + error.error.errors.name)
        document.getElementById('nameInput').focus()
      })
  }
  onViewtags(category){
    console.log(category.id);
    let redirect =  `/categorias/${category.id}/etiquetas/${category.name}`
    
    this.router.navigateByUrl(redirect);
  }

}
