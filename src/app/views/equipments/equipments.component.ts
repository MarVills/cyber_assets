import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { ModifyEquipmentDialogComponent } from './components/modify-equipment-dialog/modify-equipment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Category } from 'src/app/Models/category.model';
import {
  Equipment,
  EquipmentDTO,
  EQUIPMENT_DATA,
} from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/category.model';
import {
  PerfectScrollbarComponent,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/store/services/auth/auth.service';
import { ManageAccountService } from 'src/app/store/services/manage-account.service';
import { ModifyCategoriesDialogComponent } from './components/modify-categories-dialog/modify-categories-dialog.component';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
// import { EquipmentsState } from 'src/app/store/state/equipments.state';
import * as equipmentActions from '.././../store/equipments/equipments.actions';
import * as categpriesActions from '../../store/categories/categories.actions';
import { selectCategory } from 'src/app/store/categories/categories.selectors';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit, OnDestroy {
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;
  @ViewChild(PerfectScrollbarComponent)
  componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  displayedColumns = ['serial-number', 'equipment', 'status', 'action'];
  equipmentDataSource = new MatTableDataSource<Equipment>([]);
  equipmentsByCategory: Map<string, Equipment[]> = new Map<
    string,
    Equipment[]
  >();
  _searchCategoryForm!: FormGroup;
  _searchEquipmentForm!: FormGroup;
  toEditData!: EquipmentDTO;
  panelOpenState: boolean = false;
  sidePanelOpened: boolean = true;
  searchText: string = '';
  equipments!: Equipment[];
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
    private equipmentService: EquipmentsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private manageAccountService: ManageAccountService,
    private store: Store
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['serial-number', 'equipment', 'status', 'action']
        : ['serial-number', 'equipment', 'status', 'action'];
    });
  }
  ngOnDestroy(): void {
    this.categoriesSubscription$.unsubscribe();
    this.equipmentSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.manageAccountService.onFetchAccDetails();
    this.searchCategoryForm();
    this.searchEquipmentForm();
    this.equipment$ = this.store.select(selectEquipment);
    this.categoriesSubscription$ = this.store
      .select(selectCategory)
      .subscribe((response) => {
        if (response.categories.length != 0) {
          this.categories = response.categories;
          this.equipmentSubscription$ = this.store
            .select(selectEquipment)
            .subscribe((response) => {
              console.log('response', response)
              if (response.length != 0) {
                this.equipmentDataSource = new MatTableDataSource<Equipment>(response);
                this.equipments = response;
                this.setEquipmentsByCategory();
                this.getBackgroundColors();
                this.allEquipments('#f5f5f5');
              }
            });
        }
      });
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

  filterByCategory(category: string, color: string, equipments: string) {
    this.hasEquipments = Number(equipments) > 0;
    this.toolbarBgColor = color;
    this.equipment$ = this.store.select(selectEquipment);
    this.equipment$.subscribe((response) => {
      let filteredEquipment: Equipment[] = [];
      response.forEach((item) => {
        if (item.category == category) {
          filteredEquipment.push(item);
        }
      });
      this.equipment$ = of(filteredEquipment);
    });
  }

  setEquipmentsByCategory() {
    this.categories.forEach((category) => {
      let filteredEquipment = this.equipments.filter(
        (equipment) => equipment.category === category.category_name
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
      return this.equipments.length.toString();
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
    // addDialogRef.afterClosed().subscribe(() => {
    //   // this.refresh()
    //   //

    // });
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
        description: data.description,
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

  onDelete(data: Equipment) {
    let isDelete = this.sharedService.openAlertDialog(
      'Delete Equipment',
      'Are you sure you want to delete this equipment?',
      'Delete'
    );
    isDelete.subscribe((response) => {
      switch (response) {
        case 'confirm':
          this.equipmentService.onDeleteEquipment(data);
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
    this.equipment$ = this.store.select(selectEquipment);
  }
}
