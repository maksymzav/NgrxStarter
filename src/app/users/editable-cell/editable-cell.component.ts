import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from '../user.interface';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {UsersStore} from '../users.store';
import {AsyncPipe} from '@angular/common';

const editableColumns: Record<keyof User, boolean> = {
  id: false,
  name: true,
  username: true,
  email: true,
};

@Component({
  selector: 'app-editable-cell',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    AsyncPipe
  ],
  templateUrl: './editable-cell.component.html',
  styleUrl: './editable-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableCellComponent {
  @Input({required: true}) userId!: number;
  @Input({required: true}) columnName!: keyof User;
  editableColumns = editableColumns;

  protected usersDictionary$ = this.usersStore.usersDictionary$;
  protected editModeEnabledOn$ = this.usersStore.editModeEnabledOn$;

  constructor(private usersStore: UsersStore) {

  }
}
