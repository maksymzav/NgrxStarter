import {Injectable} from '@angular/core';
import {ComponentStore, OnStoreInit} from '@ngrx/component-store';
import {User} from './user.interface';
import {Observable, Subscription, tap} from 'rxjs';
import {UsersService} from './users.service';

export interface UsersState {
  usersList: User[],
}

const initialState: UsersState = {
  usersList: [],
};

@Injectable({
  providedIn: 'root',
})
export class UsersStore extends ComponentStore<UsersState> implements OnStoreInit {
  usersList$: Observable<User[]> = this.getUsersListSelector();

  setUsersList: (usersList: User[]) => Subscription = this.getUsersListUpdater();
  fetchUsersList = this.getFetchAllUsersEffect();

  constructor(private usersService: UsersService) {
    super(initialState);
  }

  ngrxOnStoreInit(): void {
    this.fetchUsersList();
  }


  private getUsersListSelector() {
    return this.select<User[]>(({usersList}) => usersList);
  }

  private getUsersListUpdater() {
    return this.updater<User[]>((state: UsersState, usersList: User[]) => ({
      ...state,
    usersList,
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
