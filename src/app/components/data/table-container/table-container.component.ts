import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InventoryItem } from 'src/app/models/inventory-item.model';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address', 'status', 'type', 'manager']
  @Input() dataSource: InventoryItem[] = [];
  @Input() originalData: InventoryItem[] = [];
  @Input() isEditing: boolean = false;
  formArray: FormArray = this.fb.array([]);;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formArray = this.fb.array(this.dataSource.map(item => this.createFormGroup(item)));
  }

  createFormGroup(item: InventoryItem): FormGroup {
    return this.fb.group({
      id: [item.id],
      name: [item.name],
      address: [item.address],
      status: [item.status],
      type: [item.type],
      manager: [item.manager]
    });
  }

  saveChanges() {
    const changes = this.formArray.controls
      .map(group => group.value)
      .filter(item => this.hasChanges(item));
  
    console.log('Changed items:', changes);
  }

  cancelChanges(){
    this.formArray = this.fb.array(this.originalData.map(item => this.createFormGroup(item)));
  }

  private hasChanges(item: InventoryItem): boolean {
    const originalItem = this.dataSource.find(data => data.id === item.id);
    return originalItem ? JSON.stringify(item) !== JSON.stringify(originalItem) : false;
  }
}
