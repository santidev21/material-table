import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { EditModeService } from 'src/app/services/edit-mode.service';
import { Subscription } from 'rxjs';
import { TableContainerComponent } from './table-container/table-container.component';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

  inventoryData1: InventoryItem[] = [
    { id: 1, name: 'Warehouse A', address: '123 Main St', status: true, type: 'Warehouse', manager: 'John Doe' },
    { id: 2, name: 'Lot B', address: '456 Maple Ave', status: false, type: 'Lot', manager: 'Jane Smith' },
    { id: 3, name: 'Warehouse C', address: '789 Elm St', status: true, type: 'Warehouse', manager: 'Alice Johnson' },
    { id: 4, name: 'Lot D', address: '101 Oak Dr', status: false, type: 'Lot', manager: 'Bob Brown' },
    { id: 5, name: 'Warehouse E', address: '202 Pine Rd', status: true, type: 'Warehouse', manager: 'Charlie Davis' }
  ];

  inventoryData2: InventoryItem[] = [
    {  id: 6,name: 'Warehouse Z', address: '24 Main St', status: true, type: 'Warehouse', manager: 'John Doe' },
    {  id: 7, name: 'Lot X', address: '52 Maple Ave', status: false, type: 'Lot', manager: 'Scarlet Smith' }
  ];

  InventoryData: InventoryItem[][] = [];
  originalData: InventoryItem[][] = [];

  isEditing: boolean = false;
  editModeSupcrition: Subscription = new Subscription;

  @ViewChildren(TableContainerComponent)
  tableContainers!: QueryList<TableContainerComponent>;


  constructor(private editModeService: EditModeService) { }

  ngOnInit(): void {
    this.editModeSupcrition = this.editModeService.isEditing$.subscribe((editing) =>{
      this.isEditing = editing;
    })
    this.InventoryData = [this.inventoryData1, this.inventoryData2];
    this.originalData = [...this.InventoryData];
  }

  ngOnDestroy(): void {
    this.editModeSupcrition.unsubscribe();
  }


  saveChanges() {
    this.tableContainers.forEach(container => {
      container.saveChanges();
    });
  }

  cancelChanges() {
    this.tableContainers.forEach(container => {
      container.cancelChanges();
    });
  }

 
}
