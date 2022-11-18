
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { Equipment } from 'src/app/Models/equipment.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { EquipmentsService } from '../../../../store/services/inventory/equipments.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-equipments',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  displayedColumns = [ 'equipment', 'status', 'category', 'action'];
  dataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  actionButton: string = "Add";
  
  _equipmentForm!: FormGroup;
  
 

  constructor(
    breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public equipmentData:Equipment,
    public equipmentsService: EquipmentsService,
    private sharedService: SharedService) { 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'equipment', 'status', 'category', 'action'] :
          [ 'equipment', 'status', 'category', 'action'];
    });
  }

  ngOnInit(): void {
    this.equipmentForm();
    this.equipmentsService.isEdit? this.actionButton = "Edit": "Add"; 
  }
  
  equipmentForm(){
    var isEdit = this.equipmentsService.isEdit;
    this._equipmentForm = this.formBuilder.group({
      equipment: new FormControl(isEdit?this.equipmentData.equipment:"", Validators.required),
      status: new FormControl(isEdit?this.equipmentData.status:"", Validators.required),
      price: new FormControl(isEdit?this.equipmentData.price:"", [
        Validators.required,
        RxwebValidators.numeric({allowDecimal:true,isFormat:true})  
      ]),
      category: new FormControl(isEdit?this.equipmentData.category:"", Validators.required),
      description: new FormControl(isEdit?this.equipmentData.description:"", Validators.required),
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

  onSubmit(formDirective: FormGroupDirective){
    if(this.equipmentsService.isEdit){
      this.equipmentsService.onEditEquipment(this.equipmentsService.toEditData, this._equipmentForm.value).then(()=>{
        this.sharedService.openSnackBar("Equipment Edited Successfuly", "Ok");
      })
    }else{
      var data = this._equipmentForm.value;
      EQUIPMENT_DATA.push(data)
      this.equipmentsService.onAddEquipment(data).then(res => {
        this.sharedService.openSnackBar("Equipment Added Successfully", "Ok")
      })
      this.clearForm(formDirective);
    }
    formDirective.resetForm();
  }

}


