import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import { Equipment,
         EquipmentDTO,
         Category,
         EQUIPMENT_DATA,
         CATEGORY_DATA 
      } from 'src/app/Models/equipment.model';



@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {
  
  displayedColumns = [ 'equipment', 'status', 'category', 'action'];
  equipmentDataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  // categoryDataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  _categoryForm!: FormGroup;
  toEditData!:EquipmentDTO;
  panelOpenState = false;
  categories!: Category[];
  constructor(
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private equipmentService: EquipmentsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
    ) { 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'equipment', 'status', 'category', 'action'] :
          [ 'equipment', 'status', 'category', 'action'];
    });
   
  }

  ngOnInit(): void {
    this.equipmentService.onFetchEquipments();
    this.equipmentService.onFetchCategories();
    this.categoryForm();
    this.refresh()
  }

  categoryForm(){
    this._categoryForm = this.formBuilder.group({
      category: new FormControl(""),
     });
  }
  
  
  onDelete(data: EquipmentDTO){
    this.equipmentService.onDeleteEquipment(data).then((res)=>{
      this.sharedService.openSnackBar("Deleted successfully", "Undo")
    })
    this.refresh();
  }

  refresh(){
    setTimeout(() => {
      this.equipmentDataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
      this.categories = CATEGORY_DATA;
      console.log("dataaaaaaa",CATEGORY_DATA)
    }, 1000);
  }

  openAddEquipmentDialog(): void {
    this.equipmentService.isEdit = false;
    const addDialogRef = this.dialog.open(DialogComponent, {
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
    const editDialogRef = this.dialog.open(DialogComponent, {
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

  openAddCategoryDialog(): void {
    const addDialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '500px',
      data: {},
    });
    addDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }

  applyFilter(filterValue: string) {
    
  }

  editTodo(i: string, str: string) {
    if (this.categories) {
      if (str === 'edit') {
          this.categories.find(x => x.id === i)!.edit = true;
      } else {
          this.categories.find(x => x.id === i)!.edit = false;
      }
    }
    this.categories = CATEGORY_DATA;
  }

  deleteTodo(id: number) {
      console.log(id);
      this.categories.splice(id, 1);
      this.categories = CATEGORY_DATA;
  }


}





