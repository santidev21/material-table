import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditModeService } from 'src/app/services/edit-mode.service';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent implements OnInit {


  @Output() saveClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();
  
  isEditing: boolean = false;
  constructor(private editModeService: EditModeService) { }

  ngOnInit(): void {
  }

  toggleEditMode(value: boolean){
    this.isEditing = value;
    this.editModeService.isEditing = value;
  }

  saveChanges(){
    this.saveClicked.emit();
    this.toggleEditMode(false);
  }

  cancelChanges(){
    this.cancelClicked.emit();
    this.toggleEditMode(false);
  }
}
