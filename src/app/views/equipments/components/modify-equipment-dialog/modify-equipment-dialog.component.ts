import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { CATEGORY_DATA, Category } from 'src/app/Models/category.model';
import { Equipment } from 'src/app/Models/equipment.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { EquipmentsService } from '../../../../store/services/inventory/equipments/equipments.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { ModifyCategoriesDialogComponent } from '../modify-categories-dialog/modify-categories-dialog.component';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import { EQUIPMENT_CONDITIONS } from 'src/app/shared/equipment-conditions/equipment-conditions';
import { Store } from '@ngrx/store';
import * as equipmentActions from '../../../../store/equipments/equipments.actions';
import { ActivityLog } from 'src/app/Models/activity-log-model';
import { User } from 'src/app/shared/user-details/user-details';

@Component({
  selector: 'app-equipments',
  templateUrl: './modify-equipment-dialog.component.html',
  styleUrls: ['./modify-equipment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModifyEquipmentDialogComponent implements OnInit {
  equipmentStatus = Object.values(EQUIPMENT_CONDITIONS);
  dataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  actionButton: string = 'Add';
  categories!: Category[];
  _equipmentForm!: FormGroup;
  _searchCategoryForm!: FormGroup;
  serialData = 'somenhtingng';
  serialFieldRow = 1;
  serialNumbers: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public equipmentData: Equipment,
    public equipmentsService: EquipmentsService,
    private store: Store,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private categoriesService: CategoriesService,
    private user: User
  ) {}

  ngOnInit(): void {
    this.equipmentForm();
    this.searchCategoryForm();
    this.categoriesService.onFetchCategories();
    this.equipmentsService.isEdit ? (this.actionButton = 'Edit') : 'Add';
    this.categories = CATEGORY_DATA;
  }

  searchCategoryForm() {
    this._searchCategoryForm = this.formBuilder.group({
      searchCategory: new FormControl(''),
    });
  }

  equipmentForm() {
    let isEdit = this.equipmentsService.isEdit;
    this._equipmentForm = this.formBuilder.group({
      item_name: new FormControl(
        isEdit ? this.equipmentData.item_name : '',
        Validators.required
      ),
      item_count: new FormControl(1, Validators.pattern('[0-9]*')),
      status: new FormControl(
        isEdit ? this.equipmentData.status : '',
        Validators.required
      ),
      category: new FormControl(
        isEdit ? this.equipmentData.category : '',
        Validators.required
      ),
      serial_no: new FormControl(
        {
          value: isEdit ? this.equipmentData.serial_no : '',
          disabled: true,
        },
        Validators.required
      ),
      description: new FormControl(
        isEdit ? this.equipmentData.description : '',
        Validators.required
      ),
    });
  }

  searchCategory(filterValue: string) {
    filterValue = filterValue.toLowerCase();
    this.categories = CATEGORY_DATA.filter((value) => {
      return value.category_name.toString().toLowerCase().indexOf(filterValue) > -1;
    }).map((val) => {
      return val;
    });
  }

  onCancelEdit(formDirective: FormGroupDirective) {
    this.equipmentsService.isEdit = false;
    formDirective.resetForm();
  }

  clearForm(formDirective: FormGroupDirective) {
    this._equipmentForm.reset();
    formDirective.resetForm();
  }

  generateSerialNumber(): string {
    const value = this._equipmentForm.value;
    const category: Category[] = this.categories.filter(
      (category: Category) => category.category_name === value.category
    );
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const milliseconds = new Date().getMilliseconds();
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const constructSerialNumber: string = `${category[0].prefix}-${year}${month}${day}${hours}${minutes}${milliseconds}-${randomNumber}`;
    return constructSerialNumber;
  }

  onCategoryOrItemsChange() {
    const value = this._equipmentForm.value;
    if (value.category != '') {
      const value = this._equipmentForm.value;
      this.serialNumbers.splice(0);
      for (let i = 0; i < Number(value.item_count); i++) {
        this.serialNumbers.push(this.generateSerialNumber());
      }
      this._equipmentForm.patchValue({
        serial_no: this.serialNumbers.toString().replace(/,/g, '\n'),
      });
      this.serialFieldRow = Number(value.item_count);
    }
  }

  onModifyEquipment(formDirective: FormGroupDirective) {
    const isEdit: boolean = this.equipmentsService.isEdit;
    const isFormValid: boolean = this._equipmentForm.valid;
    const condition = [isEdit, isFormValid].toString();

    switch (condition) {
      case 'true,true':
        this.equipmentsService.onEditEquipment(
          this.equipmentsService.toEditData,
          this._equipmentForm.value
        );
        break;
      case 'false,true':
        const formValues = this._equipmentForm.value;
        // let equipmentDetails: Equipment;
        console.log("serial numbers", this.serialNumbers)
        const userDetails = this.user.signedInUserDetails;
        this.serialNumbers.forEach((serialNumber) => {
          const equipmentDetails: Equipment = {
            item_name: formValues.item_name,
            status: formValues.status,
            category: formValues.category,
            serial_no: serialNumber,
            description: formValues.description,
          };
          const addEquipmentLog: ActivityLog = {
            activity:
              this.serialNumbers.length > 1
                ? `Added ${this.serialNumbers.length} equipments`
                : `Added equipment`,
            userName: "dummy name", //userDetails.firstName + formValues.lastName,
            userRole: "dummy role", //userDetails.userRole!,
            date:
              new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          };
          this.store.dispatch(
            equipmentActions.requestAddEquipmentACTION({
              payload: equipmentDetails,
              addItemLog: addEquipmentLog,
            })
          );
        });
        this.clearForm(formDirective);
        break;
      case 'false,false':
        this.sharedService.openSnackBar(
          'Adding equipment failed!, please enter valid equipment details'
        );
        break;
      case 'true,false':
        this.sharedService.openSnackBar(
          'Editing equipment failed!, please enter valid equipment details'
        );
        break;
      default:
        break;
    }
  }

  openCategoryDialog(data: any): void {
    const addDialogRef = this.dialog.open(ModifyCategoriesDialogComponent, {
      maxHeight: '90vh',
      width: '500px',
      data: {},
    });
    addDialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    setTimeout(() => {
      this.categories = CATEGORY_DATA;
    }, 1000);
  }
}
