import {Injectable} from '@angular/core';
import {ComponentStore, OnStoreInit} from '@ngrx/component-store';
import {User} from './user.interface';
import {Observable, Subscription, tap} from 'rxjs';
import {UsersService} from './users.service';
import {createEntityAdapter, Dictionary, EntityAdapter, EntityState} from '@ngrx/entity';

export interface UsersState extends EntityState<User> {
  editModeEnabledOn: number | null;
}

const adapter: EntityAdapter<User> = createEntityAdapter();
const selectors = adapter.getSelectors();

const initialState: UsersState = adapter.getInitialState({
  editModeEnabledOn: null,
});

@Injectable()
export class UsersStore extends ComponentStore<UsersState> implements OnStoreInit {
  usersList$: Observable<User[]> = this.getUsersListSelector();
  usersDictionary$: Observable<Dictionary<User>> = this.getUsersDictionarySelector();
  editModeEnabledOn$: Observable<number | null> = this.getEditModeEnabledUserSelector();

  setUsersList: (usersList: User[]) => Subscription = this.getUsersListUpdater();
  fetchUsersList = this.getFetchAllUsersEffect();
  enableEditModeOn: (userId: number) => Subscription = this.getEditModeEnabledUserUpdater();

  constructor(private usersService: UsersService) {
    super(initialState);
  }

  ngrxOnStoreInit(): void {
    this.fetchUsersList();
  }


  private getUsersListSelector() {
    return this.select<User[]>((state) => selectors.selectAll(state));
  }

  private getUsersDictionarySelector() {
    return this.select<Dictionary<User>>((state) => selectors.selectEntities(state));
  }

  private getEditModeEnabledUserSelector() {
    return this.select<number | null>(({editModeEnabledOn}) => editModeEnabledOn);
  }

  private getUsersListUpdater() {
    return this.updater<User[]>((state: UsersState, usersList: User[]) => adapter.setAll(usersList, state));
  }

  private getEditModeEnabledUserUpdater() {
    return this.updater<number | null>((state: UsersState, userId: number | null) => ({
      ...state,
      editModeEnabledOn: userId,
    }));
  }

  private getFetchAllUsersEffect() {
    return this.effect(() => this.usersService.getAll().pipe(
      tap((users) => {
        this.setUsersList(users);
      }),
    ));
  }


}
