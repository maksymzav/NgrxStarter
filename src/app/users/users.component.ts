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
import {Observable} from 'rxjs';
import {UsersStore} from './users.store';
import {EditableCellComponent} from './editable-cell/editable-cell.component';
import {MatButton} from '@angular/material/button';
import {provideComponentStore} from '@ngrx/component-store';

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
  providers: [
    provideComponentStore(UsersStore),
  ]
})
export class UsersComponent {
  protected data$: Observable<User[]> = this.usersStore.usersList$;
  protected displayedColumns = ['id', 'name', 'username', 'email', 'actions'];

  constructor(private usersStore: UsersStore) {
  }

  onEdit(userId: number) {
    this.usersStore.enableEditModeOn(userId);
  }
}
