import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category, CATEGORY_DATA } from 'src/app/Models/category.model';
import { EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { SharedService } from 'src/app/shared/shared.service';
import { selectCategory } from 'src/app/store/categories/categories.selectors';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';

@Component({
  selector: 'app-modify-categories-dialog',
  templateUrl: './modify-categories-dialog.component.html',
  styleUrls: ['./modify-categories-dialog.component.scss'],
})
export class ModifyCategoriesDialogComponent implements OnInit {
  categories!: Category[];
  _addCategoryForm!: FormGroup;
  _editCategoryForm!: FormGroup;
  _searchCategoryForm!: FormGroup;

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
    console.log("get categpries", this.categoryData.categories)
    this.categories = this.categoryData.categories ;
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
    const isPrefixExist = this.categories.filter(
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
      edit: false,
    };
    this.categoriesService.onAddCategory(category);
    this.categories = CATEGORY_DATA;
    formDirective.resetForm();
  }

  editCategory(action: string, index: number) {
    if (this.categories) {
      switch (action) {
        case 'edit':
          this.editCategoryForm(this.categories[index].category_name);
          const editCategory: Category = {
            id: CATEGORY_DATA[index].id,
            category_name: this._editCategoryForm.value.category_name,
            edit: true,
          };
          CATEGORY_DATA[index] = editCategory;
          break;
        case 'save':
          const categoryName = this._editCategoryForm.value.editCategory;
          const saveCategory: Category = {
            id: CATEGORY_DATA[index].id,
            category_name: categoryName,
            edit: false,
          };
          if (categoryName !== CATEGORY_DATA[index].category_name) {
            this.categoriesService.onEditCategory(index, saveCategory);
          }
          CATEGORY_DATA[index] = saveCategory;
          break;
      }
    }
    this.categories = CATEGORY_DATA;
  }

  checkIfCategoryUsed(category: string): boolean {
    let isUsed: boolean = false;
    EQUIPMENT_DATA.forEach((equipment) => {
      if (equipment.category == category) {
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
      );
      return;
    }

    let isDelete = this.sharedService.openAlertDialog(
      'Delete Category',
      'Are you sure you want to delete this category?',
      'Delete'
    );
    isDelete.subscribe((response: string) => {
      switch (response) {
        case 'confirm':
          this.categoriesService.onDeleteCategory(category);
          this.categories = CATEGORY_DATA;
          break;
        case 'cancel':
          this.sharedService.openSnackBar('Deleting category canceld !');
          break;
        default:
          break;
      }
    });
  }
}
