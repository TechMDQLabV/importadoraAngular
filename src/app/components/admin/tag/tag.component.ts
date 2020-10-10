import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'app/models/Tag';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  
  nameCategory: string
  nameInput:string;
  idInput:number;
  idInputCategory:number;
  tags: Tag[] = [];
  buttonSave: boolean = true
  constructor(private tagService: TagService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    
    this.idInputCategory = parseInt(id)
    this.getAllTagByCategory(id)
    
  }

  onAddTag(){
    let tag = new Tag(this.nameInput, this.idInputCategory);
    this.tagService.saveTag(tag)
      .subscribe(response=>{               
        this.nameInput = '';
        this.getAllTagByCategory(this.idInputCategory)
        document.getElementById('nameInput').focus()
      }, error => {
        alert('Error: ' + error.error.errors.name)
        document.getElementById('nameInput').focus()
      })      
  }

  getAllTagByCategory(idCategory){
    this.tagService.getAllTagsForCategory(idCategory).subscribe(response =>{     
      this.nameCategory = response.category.name
      this.tags = response.tags
      console.log('tag',response);  
    });
  }

  onChangeStatus(Idcategory,idTag){
    this.tagService.changeStatus(idTag).subscribe(response =>{
      this.getAllTagByCategory(Idcategory)
    })
  }

  onDelete(Idcategory,idTag){
    this.tagService.delete(idTag).subscribe(response =>{
      this.getAllTagByCategory(Idcategory)
    })
  }

  onUpdate(tag){
    console.log(tag);
    this.nameInput= tag.name
    this.idInput=tag.id
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
    let tag = new Tag(this.nameInput, this.idInputCategory);
    this.tagService.updateTag(this.idInput,tag)
      .subscribe(response=>{               
        this.onButtonAdd()
        this.getAllTagByCategory(this.idInputCategory)
      }, error => {
        console.error(error.error.errors)
        alert('Error: ' + error.error.errors.name)
        document.getElementById('nameInput').focus()
      })
  }

  
  
}
