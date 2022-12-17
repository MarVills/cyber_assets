import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category, } from 'src/app/Models/category.model';
import { EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { SharedService } from 'src/app/shared/shared.service';
import { selectCategory } from 'src/app/store/categories/categories.selectors';
import * as categoryActions from '../../../../store/categories/categories.actions';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { selectUserData } from 'src/app/store/auth/auth.selectors';
import { ActivityLog } from 'src/app/Models/activity-log-model';

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
  categories$!: Observable<any[]>
  _addCategoryForm!: FormGroup;
  _editCategoryForm!: FormGroup;
  _searchCategoryForm!: FormGroup;
  tempEdit = false;
  userData:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public categoryData: any,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.addCategoryForm();
    this.searchCategoryForm();
    this.updateCategoryState();
    this.store.select(selectUserData).subscribe((response)=>{
     this.userData = response
    })
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
    };
    const addCategoryLog: ActivityLog = {
      activity: `${value.addCategory} category added. `,
      user_id: this.userData.userData.id,
      date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
    };
    this.store.dispatch(categoryActions.requestAddCategoryACTION({payload: category, categoryLog: addCategoryLog}))
    formDirective.resetForm();
  }

  editCategory(action: string, category: Category) {
    if (this.categoryList) {
      switch (action) {
        case 'edit':
          this.editCategoryForm(category.category_name);
          this.store.dispatch(categoryActions.requestSelectCategoryACTION({payload: category}) )
          this.updateCategoryState();
          this.categories$.subscribe((response)=>{
          })
          break;
        case 'save':
          const categoryName = this._editCategoryForm.value;
          const saveCategory: Category = {
            id: category.id,
            category_name: this._editCategoryForm.value.editCategory,
            prefix: category.prefix
          };
          const updateCategoryLog: ActivityLog = {
            activity: `${category.category_name} category updated. `,
            user_id: this.userData.userData.id,
            date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          };
          this.store.dispatch(categoryActions.requestUpdateCategoryACTION({id: category.id!, payload: saveCategory, categoryLog:updateCategoryLog} ))
          this.store.dispatch(categoryActions.requestSelectCategoryACTION({payload:{id:0, category_name:"", prefix: ""}}) )
          this.updateCategoryState();
      }
    }
  }

  updateCategoryState(){
    this.store.select(selectCategory).subscribe((response)=>{
      let tempList:any = []
      response.categories.forEach((category:any) => {
        const categoryState = {
          category_name: category.category_name,
          id: category.id,
          isEdit: response.selectedCategory.id == category.id? true: false,
          prefix: category.prefix,
          user_id: 0
        }
        tempList.push(categoryState)
      });
      this.categories$ = of(tempList)
      this.categoryList = response.categories;
    })
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
           const deleteCategoryLog: ActivityLog = {
            activity: `${category.category_name} category deleted. `,
            user_id: this.userData.userData.id,
            date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          };
          this.store.dispatch( categoryActions.requestDeleteCategoryACTION({ id: category.id!, categoryLog: deleteCategoryLog }));
          break;
        case 'cancel':
          this.sharedService.openSnackBar('Deleting category canceld!');
          break;
        default:
          break;
      }
    });
  }
}
