import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {

  private _isEditing = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditing.asObservable();

  constructor() { }

  set isEditing(value: boolean){
    this._isEditing.next(value);
  }
}
