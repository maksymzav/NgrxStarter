import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {User} from './user.interface';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {map, Observable} from 'rxjs';
import {UsersStore} from './users.store';
import {EditableCellComponent} from './editable-cell/editable-cell.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatRow,
    MatRowDef,
    AsyncPipe,
    NgTemplateOutlet,
    EditableCellComponent,
    MatButton
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class UsersComponent {
  protected data$: Observable<{
    editMode: boolean,
    user: User
  }[]> = this.usersStore.usersList$.pipe(map(users => users.map(
    user => ({editMode: false, user})
  )));

  protected displayedColumns = ['id', 'name', 'username', 'email', 'actions'];

  constructor(private usersStore: UsersStore) {
  }
}
