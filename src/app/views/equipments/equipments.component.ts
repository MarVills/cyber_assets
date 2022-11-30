import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, } from '@angular/forms';
import { ModifyEquipmentDialogComponent } from './components/modify-equipment-dialog/modify-equipment-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Category } from 'src/app/Models/category.model';
import { Equipment,EquipmentDTO, EQUIPMENT_DATA} from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/category.model';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/store/services/authentication/auth.service';
import { ManageAccountService } from 'src/app/store/services/manage-account.service';
import { ModifyCategoriesDialogComponent } from './components/modify-categories-dialog/modify-categories-dialog.component';



@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {
  
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent!: ElementRef<any>;
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  displayedColumns = [ 'serial-number', 'equipment', 'status', 'action'];
  equipmentDataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  equipmentsByCategory: Map<string, Equipment[]> = new Map<string, Equipment[]>();
  _categoryForm!: FormGroup;
  toEditData!:EquipmentDTO;
  panelOpenState = false;
  sidePanelOpened = true;
  searchText = '';
  equipments!: Equipment[];
  categories: Category[] = CATEGORY_DATA;
  backgroundColors: string[] = [];

  constructor(
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private equipmentService: EquipmentsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private manageAccountService: ManageAccountService
    ) { 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'serial-number', 'equipment', 'status', 'action'] :
          [ 'serial-number', 'equipment', 'status', 'action'];
    });
  }

  ngOnInit(): void {
    this.categoriesService.onFetchCategories();
    this.equipmentService.onFetchEquipments();
    this.manageAccountService.onFetchAccDetails();
    this.categoryForm();
    this.refresh();
  }

  categoryForm(){
    this._categoryForm = this.formBuilder.group({
      searchEquipment: new FormControl(""),
     });
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  getBackgroundColors(){
    this.backgroundColors.splice(0)
    this.categories.forEach(()=>{
      this.backgroundColors.push(this.getRandomColor())
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.equipmentDataSource.filter = filterValue;
  }

  filterByCategory(category:string){
    this.equipmentDataSource.filter = category.trim().toLowerCase();
    return this.equipmentDataSource.filteredData.length;
  }

  setEquipmentsByCategory(){
    this.categories.forEach((category)=>{
      let filteredEquipment = this.equipments.filter((equipment)=>equipment.category === category.category);
      filteredEquipment?this.equipmentsByCategory.set(category.category, filteredEquipment):null
    }) 
  }

  getTotalEquipmentsPerCategory(category:string){
    try{
      return this.equipmentsByCategory.get(category)!.length
    }catch(e){
      return "0"
    }
  }

  totalEquipments():string{
    try{
      return this.equipments.length.toString()
    }catch(e){
      return "0"
    }
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  openAddEquipmentDialog(): void {
    this.equipmentService.isEdit = false;
    const addDialogRef = this.dialog.open(ModifyEquipmentDialogComponent, {
      maxHeight: '90vh',
      width: '500px',
      data: {},
    });
    addDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }

  openEditDialog(data: any): void {
    this.equipmentService.isEdit = true;
    this.equipmentService.toEditData = data;
    const editDialogRef = this.dialog.open(ModifyEquipmentDialogComponent, {
      width: '500px',
      data: { 
        equipment: data.equipment, 
        status: data.status, 
        category: data.category, 
        price: data.price, 
        description: data.description 
      },
    });
    editDialogRef.afterClosed().subscribe(result => {
      this.equipmentService.isEdit = false;
      this.refresh()
    });
  }

  openCategoryDialog(): void {
    const addDialogRef = this.dialog.open( ModifyCategoriesDialogComponent, {
      maxHeight: '90vh',
      width: '500px',
      data: {},
    });
    addDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }

  onDelete(data: EquipmentDTO){
    let isDelete = this.sharedService.openAlertDialog("Delete Equipment", "Are you sure you want to delete this equipment?", "Delete")
    isDelete.subscribe((response)=>{
      switch (response){
        case "confirm":
          this.equipmentService.onDeleteEquipment(data)
          this.refresh();
          break;
        case "cancel": 
          this.sharedService.openSnackBar("Deleting equipment canceld !");
          break;
        default: break;
      }
    })
  }

  allEquipments(){
    this.equipmentDataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  }

  refresh(){
    setTimeout(() => {
      this.equipments = EQUIPMENT_DATA;
      this.categories = CATEGORY_DATA;
      this.setEquipmentsByCategory();
      this.getBackgroundColors();
      this.allEquipments();
    }, 1000);
  }
}











