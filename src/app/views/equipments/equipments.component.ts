import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModifyEquipmentDialogComponent } from './components/modify-equipment-dialog/modify-equipment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { Category } from 'src/app/Models/category.model';
import { Equipment, EquipmentDTO } from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/category.model';
import { ModifyCategoriesDialogComponent } from './components/modify-categories-dialog/modify-categories-dialog.component';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import * as equipmentActions from '.././../store/equipments/equipments.actions';
import { selectCategory } from 'src/app/store/categories/categories.selectors';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { EquipmentsService } from '../../store/services/inventory/equipments/equipments.service';
import { selectUserData } from 'src/app/store/auth/auth.selectors';
import { ActivityLog } from 'src/app/Models/activity-log-model';


@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit, OnDestroy {

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent!: ElementRef<any>;
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  displayedColumns = ['serial-number', 'equipment', 'status', 'action'];
  equipmentDataSource = new MatTableDataSource<Equipment>([]);
  equipmentsByCategory: Map<string, Equipment[]> = new Map< string,Equipment[] >();
  _searchCategoryForm!: FormGroup;
  _searchEquipmentForm!: FormGroup;
  toEditData!: EquipmentDTO;
  panelOpenState: boolean = false;
  sidePanelOpened: boolean = true;
  searchText: string = '';
  equipmentList!: Equipment[];
  equipment$!: Observable<Equipment[]>;
  categories: Category[] = CATEGORY_DATA;
  backgroundColors: string[] = [];
  toolbarBgColor: string = '#f5f5f5';
  hasEquipments: boolean = true;
  categoriesSubscription$!: Subscription;
  equipmentSubscription$!: Subscription;

  constructor(
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private store: Store,
    private equipmentService: EquipmentsService,
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['serial-number', 'equipment', 'status', 'action']
        : ['serial-number', 'equipment', 'status', 'action'];
    });

    this.store.select(selectEquipment);
    this.categoriesSubscription$ = this.store
      .select(selectCategory)
      .subscribe((categoryResponse) => {
        if (categoryResponse.categories.length != 0) {
          this.categories = categoryResponse.categories;
          this.getBackgroundColors();
          this.equipmentSubscription$ = this.store
            .select(selectEquipment)
            .subscribe((equipmentResponse) => {
              if (equipmentResponse.equipment.length != 0) {
                this.equipment$ = of(equipmentResponse.equipment)
                this.equipmentDataSource = new MatTableDataSource<Equipment>(equipmentResponse.equipment);
                this.equipmentList = equipmentResponse.equipment;
                this.setEquipmentsByCategory();
                this.allEquipments('#f5f5f5');
              }
              if (equipmentResponse.equipment.length == 0) {
                this.hasEquipments = false;
              }
            });
        }
      });
  }
  ngOnDestroy(): void {
    this.categoriesSubscription$ != undefined ? this.categoriesSubscription$.unsubscribe():null;
    this.equipmentSubscription$ != undefined ? this.equipmentSubscription$.unsubscribe():null;
  }

  ngOnInit(): void {
    this.searchCategoryForm();
    this.searchEquipmentForm();
  }

  searchCategoryForm() {
    this._searchCategoryForm = this.formBuilder.group({
      searchCategory: new FormControl(''),
    });
  }

  searchEquipmentForm() {
    this._searchEquipmentForm = this.formBuilder.group({
      searchEquipment: new FormControl(''),
    });
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  getBackgroundColors() {
    this.backgroundColors.splice(0);
    this.categories.forEach(() => {
      this.backgroundColors.push(this.getRandomColor());
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.equipmentDataSource.filter = filterValue;
  }

  filterByCategory(category: number, color: string, equipments: string) {
    this.hasEquipments = Number(equipments) > 0;
    this.toolbarBgColor = color;
    this.store.select(selectEquipment).subscribe((response) => {
      let filteredEquipment: Equipment[] = [];
      response.equipment.forEach((item:any) => {
        if (item.category_id == category) {
          filteredEquipment.push(item);
        }
      });
      this.equipment$ = of(filteredEquipment);
    });
  }

  setEquipmentsByCategory() {
    this.categories.forEach((category) => {
      let filteredEquipment = this.equipmentList.filter(
        (equipment) => {
          return Number(equipment.category_id) === category.id
        }
      );
      filteredEquipment
        ? this.equipmentsByCategory.set(category.category_name, filteredEquipment)
        : null;
    });
  }

  getTotalEquipmentsPerCategory(category: string) {
    try {
      return this.equipmentsByCategory.get(category)!.length.toString();
    } catch (e) {
      return '0';
    }
  }

  totalEquipments(): string {
    try {
      return this.equipmentList.length!.toString();
    } catch (e) {
      return '0';
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

    });
  }

  openEditDialog(data: any): void {
    this.equipmentService.isEdit = true;
    this.store.dispatch(equipmentActions.requestSelectEquipmentACTION(data))
    
    const editDialogRef = this.dialog.open(ModifyEquipmentDialogComponent, {
      width: '500px',
      data: {
        item_name: data.item_name,
        status: data.status,
        category: this.categories.find(e=>e.id == data.category_id),
        serial_no: data.serial_no,
        description: data.description,
        user_id: 0,
      },
    });
    editDialogRef.afterClosed().subscribe((result) => {
      this.equipmentService.isEdit = false;
    });
  }

  openCategoryDialog(): void {
    const addDialogRef = this.dialog.open(ModifyCategoriesDialogComponent, {
      maxHeight: '90vh',
      width: '500px',
      data: {
        categories: this.categories
      },
    });
    addDialogRef.afterClosed().subscribe(() => {});
  }

  onDelete(equipment: Equipment) {
    let isDelete = this.sharedService.openAlertDialog(
      'Delete Equipment',
      'Are you sure you want to delete this equipment?',
      'Delete'
    );
    isDelete.subscribe((response) => {
      switch (response) {
        case 'confirm':
         this.store.select(selectUserData).subscribe((response)=>{
           const deleteEquipmentLog: ActivityLog = {
            activity: `${equipment.item_name} item deleted`,
            user_id: response.userData.id,
            date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          };
           this.store.dispatch(equipmentActions.requestDeleteEquipmentACTION({payload: equipment, itemLog: deleteEquipmentLog}))
         })
          break;
        case 'cancel':
          this.sharedService.openSnackBar('Deleting equipment canceld !');
          break;
        default:
          break;
      }
    });
  }

  allEquipments(color: string) {
    this.hasEquipments = true;
    this.toolbarBgColor = color;
    if (this.equipmentList == undefined || this.equipmentList.length == 0) {
      this.hasEquipments = false;
    }
    this.equipment$ = of(this.equipmentList)
  }
}
