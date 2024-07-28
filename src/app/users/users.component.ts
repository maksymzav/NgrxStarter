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
import {UsersService} from './users.service';
import {User} from './user.interface';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';

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
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  protected data$: Observable<User[]> = this.usersService.getAll();
  protected displayedColumns = ['id', 'name', 'username', 'email'];

  constructor(private usersService: UsersService) {
  }
}
