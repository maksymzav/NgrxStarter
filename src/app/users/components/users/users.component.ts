import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
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
import {User} from '../../types/user.interface';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {UsersStore} from '../../users.store';
import {EditableCellComponent} from '../editable-cell/editable-cell.component';
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
export class UsersComponent implements OnDestroy {
  protected data$: Observable<User[]> = this.usersStore.usersList$;
  protected displayedColumns = ['id', 'name', 'username', 'email', 'actions'];
  protected editedUser$ = this.usersStore.editedUser$;
  private subscription = new Subscription();

  constructor(private usersStore: UsersStore) {
  }

  onEdit(user: User) {
    const subscription = this.usersStore.enableEditModeOn(user);
    this.subscription.add(subscription);
  }

  onSave() {
    const subscription = this.usersStore.updateUser();
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
