import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category, CATEGORY_DATA } from 'src/app/Models/category.model';
import { EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { SharedService } from 'src/app/shared/shared.service';
import { selectCategory } from 'src/app/store/categories/categories.selectors';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import * as categoryActions from '../../../../store/categories/categories.actions';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modify-categories-dialog',
  templateUrl: './modify-categories-dialog.component.html',
  styleUrls: ['./modify-categories-dialog.component.scss'],
})
export class ModifyCategoriesDialogComponent implements OnInit {
  categoryList!: Category[];
  selectedCategory: Category = {
    category_name :  "",
    prefix: "",
    id : 0,
  }
  categories$!: Observable<Category[]>
  _addCategoryForm!: FormGroup;
  _editCategoryForm!: FormGroup;
  _searchCategoryForm!: FormGroup;
  tempEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public categoryData: any,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private categoriesService: CategoriesService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.addCategoryForm();
    this.searchCategoryForm();
    // this.categoryList = this.categoryData.categories ;
    this.store.select(selectCategory).subscribe((response)=>{
      this.categories$  = of(response.categories)
      this.categoryList = response.categories;
    })
    // this.store.select(selectCategory).subscribe((response)=>{
    //   console.log("selected category", response.selectedCategory)
    //   this.selectedCategory = response.selectedCategory
    // })
  }

  searchCategoryForm() {
    this._searchCategoryForm = this.formBuilder.group({
      searchCategory: new FormControl(''),
    });
  }

  addCategoryForm() {
    this._addCategoryForm = this.formBuilder.group({
      addCategory: new FormControl('', Validators.required),
    });
  }

  editCategoryForm(value: string) {
    this._editCategoryForm = this.formBuilder.group({
      editCategory: new FormControl(value, Validators.required),
    });
  }

  generatePrefix(): string {
    const value = this._addCategoryForm.value;
    const prefix: string = value.addCategory.substring(0, 2).toUpperCase();
    const isPrefixExist = this.categoryList.filter(
      (category) => category.category_name === prefix
    );
    if (isPrefixExist.length != 0) {
    }
    return prefix;
  }

  addCategory(formDirective: FormGroupDirective) {
    const value = this._addCategoryForm.value;
    const category: Category = {
      category_name: value.addCategory,
      prefix: this.generatePrefix(),
      // edit: false,
    };
    // console.log("adding category", category)
    // this.categoriesService.onAddCategory(category);
    this.store.dispatch(categoryActions.requestAddCategoryACTION({payload: category}))
    // this.refreshCategories();
    formDirective.resetForm();
  }

  editCategory(action: string, category: Category) {
    if (this.categoryList) {
      switch (action) {
        case 'edit':
          this.editCategoryForm(category.category_name);
          // const editCategory: Category = {
          //   category_name: this._editCategoryForm.value.category_name,
          // };
          // CATEGORY_DATA[index] = editCategory;
          this.store.dispatch(categoryActions.requestSelectCategoryACTION({payload: category}) )
          // this.categories$.

          break;
        case 'save':
          const categoryName = this._editCategoryForm.value.editCategory;
          // const saveCategory: Category = {
          //   // id: CATEGORY_DATA[index].id,
          //   category_name: categoryName,
          //   // edit: false,
          // };
           this.store.dispatch(categoryActions.requestUpdateCategoryACTION({id: category.id!, payload: category} ))
          // if (categoryName !== CATEGORY_DATA[index].category_name) {
          //   this.categoriesService.onEditCategory(index, saveCategory);
          // }
          // CATEGORY_DATA[index] = saveCategory;
          // break;
      }
    }
  }

  checkIfCategoryUsed(categoryId: number): boolean {
    let isUsed: boolean = false;
    EQUIPMENT_DATA.forEach((equipment) => {
      if (equipment.category_id == categoryId) {
        isUsed = true;
      }
    });
    return isUsed;
  }

  deleteCategory(category: any) {
    if (this.checkIfCategoryUsed(category.category)) {
      this.sharedService.openAlertDialog(
        'Delete Failed',
        'Cannot delete category because \nit is being used in other equipment',
        'OK'
      ); return;
    }
    let isDelete = this.sharedService.openAlertDialog(
      'Delete Category',
      'Are you sure you want to delete this category?',
      'Delete'
    );
    isDelete.subscribe((response: string) => {
      switch (response) {
        case 'confirm':
          // this.categoriesService.onDeleteCategory(category);
          this.store.dispatch(
          categoryActions.requestDeleteCategoryACTION({ id: category.id! })
          );
          // this.refreshCategories();
          break;
        case 'cancel':
          this.sharedService.openSnackBar('Deleting category canceld!');
          break;
        default:
          break;
      }
    });
  }

  // refreshCategories(){

  // }
}
