
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EQUIPMENT_DATA, CATEGORY_DATA, Category } from 'src/app/Models/equipment.model';
import { Equipment } from 'src/app/Models/equipment.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { EquipmentsService } from '../../../../store/services/inventory/equipments/equipments.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { ModifyCategoriesDialogComponent } from '../modify-categories-dialog/modify-categories-dialog.component';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';


@Component({
  selector: 'app-equipments',
  templateUrl: './modify-equipment-dialog.component.html',
  styleUrls: ['./modify-equipment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModifyEquipmentDialogComponent implements OnInit {
  
  displayedColumns = [ 'equipment', 'status', 'category', 'action'];
  equipmentStatus = ['Good', "Fair/Poor", "Scrap/Damaged", "Repaired", "Borrowed", "Missing"];
  dataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  actionButton: string = "Add";
  categories!: Category[];
  _equipmentForm!: FormGroup;
  _searchCategoryForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public equipmentData:Equipment,
    breakpointObserver: BreakpointObserver,
    public equipmentsService: EquipmentsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private categoriesService: CategoriesService) { 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'equipment', 'status', 'category', 'action']:
          [ 'equipment', 'status', 'category', 'action'];
    });
  }

  ngOnInit(): void {
    this.equipmentForm();
    this.categoryForm();
    this.categoriesService.onFetchCategories();
    this.equipmentsService.isEdit? this.actionButton = "Edit": "Add"; 
    this.categories = CATEGORY_DATA;
  }
  
  categoryForm(){
    this._searchCategoryForm = this.formBuilder.group({
      category: new FormControl(""),
     });
  }
  
  equipmentForm(){
    let isEdit = this.equipmentsService.isEdit;
    this._equipmentForm = this.formBuilder.group({
      equipment: new FormControl(isEdit?this.equipmentData.equipment:"", Validators.required),
      status: new FormControl(isEdit?this.equipmentData.status:"", Validators.required),
      category: new FormControl(isEdit?this.equipmentData.category:"", Validators.required),
      description: new FormControl(isEdit?this.equipmentData.description:"", Validators.required),
     });
  }

  searchCategory(filterValue: string) {
    filterValue = filterValue.toLowerCase(); 
    this.categories = CATEGORY_DATA.filter((value)=>{
    return value.category.toString().toLowerCase().indexOf(filterValue) > -1
    }).map((val)=>{
      return val
    });
  }

  onCancelEdit(formDirective: FormGroupDirective){
    this.equipmentsService.isEdit = false
    formDirective.resetForm();
  }

  clearForm(formDirective: FormGroupDirective){
    this._equipmentForm.reset()
    formDirective.resetForm();
  }

  // Need optimize
  onModifyEquipment(formDirective: FormGroupDirective){
    const isEdit:boolean = this.equipmentsService.isEdit;
    const isFormValid:boolean = this._equipmentForm.valid;
    const condition = [isEdit, isFormValid].toString();
  
    switch(condition){
      case 'true,true':
        this.equipmentsService.onEditEquipment(this.equipmentsService.toEditData, this._equipmentForm.value)
        break;
      case 'false,true':
        let data = this._equipmentForm.value;
        EQUIPMENT_DATA.push(data)
        this.equipmentsService.onAddEquipment(data)
        this.clearForm(formDirective);
        break;
      case 'false,false':
        this.sharedService.openSnackBar("Adding equipment failed!, please enter valid equipment details")
        break;
      case 'true,false':
        this.sharedService.openSnackBar("Editing equipment failed!, please enter valid equipment details")
        break;
      default: break;
    }
  }

  openCategoryDialog(data: any): void {
    const addDialogRef = this.dialog.open( ModifyCategoriesDialogComponent, {
      width: '500px',
      data: {},
    });
    addDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }
  
  refresh(){
    setTimeout(() => {
      this.categories = CATEGORY_DATA;
    }, 1000);
  }
    
}


