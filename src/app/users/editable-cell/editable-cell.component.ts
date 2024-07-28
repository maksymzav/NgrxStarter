import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from '../user.interface';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-editable-cell',
  standalone: true,
  imports: [
    MatFormField,
    MatInput
  ],
  templateUrl: './editable-cell.component.html',
  styleUrl: './editable-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableCellComponent {
  @Input({required: true}) userData!: User;
  @Input() editMode = false;
  @Input({required: true}) columnName!: keyof User;
}
