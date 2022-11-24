import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category, CATEGORY_DATA } from 'src/app/Models/category.model';
import { SharedService } from 'src/app/shared/shared.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';

@Component({
  selector: 'app-modify-categories-dialog',
  templateUrl: './modify-categories-dialog.component.html',
  styleUrls: ['./modify-categories-dialog.component.scss']
})
export class ModifyCategoriesDialogComponent implements OnInit {

  categories!: Category[];
  _addCategoryForm!: FormGroup;
  _editCategoryForm!: FormGroup;
  _searchCategoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.addCategoryForm();
    this.searchCategoryForm();
    this.categories = CATEGORY_DATA;
  }

  searchCategoryForm(){
    this._searchCategoryForm = this.formBuilder.group({
      searchCategory: new FormControl(""),
     });
  }

  addCategoryForm(){
    this._addCategoryForm = this.formBuilder.group({
      addCategory: new FormControl("", Validators.required),
     });
  }

  editCategoryForm(value: string){
    this._editCategoryForm = this.formBuilder.group({
      editCategory: new FormControl(value, Validators.required),
     });
  }

  generatePrefix(): string{
    const value = this._addCategoryForm.value;
    let prefix:string = value.addCategory.substring(0,2).toUpperCase();
    const isPrefixExist = this.categories.filter(category=>category.category === prefix)
    if(isPrefixExist.length != 0){
     
    }
    return prefix;
  }

  addCategory(formDirective: FormGroupDirective){
    const value = this._addCategoryForm.value;
    const category: Category = {
      category: value.addCategory,
      prefix: this.generatePrefix(),
      edit: false
    }
    this.categoriesService.onAddCategory(category)
    this.categories = CATEGORY_DATA;
    formDirective.resetForm();
  }

  editCategory( action: string, index: number) {
    
    if (this.categories) {
      let cat = this.categories;
      switch(action){
        case "edit":
          this.editCategoryForm(this.categories[index].category);
          const editCategory: Category = {
            id: CATEGORY_DATA[index].id,
            prefix: "EX",
            category: this._editCategoryForm.value.category,
            edit: true
          }
          CATEGORY_DATA[index] = editCategory;
          break;
        case "save":
          const saveCategory: Category = {
            id: CATEGORY_DATA[index].id,
            prefix: "EX",
            category: this._editCategoryForm.value.editCategory,
            edit: false
          }
          CATEGORY_DATA[index] = saveCategory;
          this.categoriesService.onEditCategory(index, saveCategory)
          break;
      }
    }
    this.categories = CATEGORY_DATA;
  }

  deleteCategory(category: any) {
    let isDelete = this.sharedService.openAlertDialog("Delete Category", "Are you sure you want to delete this category?", "Delete")
    isDelete.subscribe((response)=>{
      switch (response){
        case "confirm":
          this.categoriesService.onDeleteCategory(category)
          this.categories = CATEGORY_DATA;
          break;
        case "cancel": 
          this.sharedService.openSnackBar("Deleting category canceld !");
          break;
        default: break;
      }
    })
  }
}
