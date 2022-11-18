import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  _categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private equipmentsService: EquipmentsService) { }

  ngOnInit(): void {
    this.categoryForm();
  }

  categoryForm(){
    this._categoryForm = this.formBuilder.group({
      category: new FormControl(""),
     });
  }

  onSubmit(formDirective: FormGroupDirective){
    console.log(this._categoryForm.value)
    this.equipmentsService.onAddCategory(this._categoryForm.value)
  }
  // addTodo() {
  //   this.equipmentsService.onAddCategory(this._categoryForm.value)
  // }

}
