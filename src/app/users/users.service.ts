import {Inject, Injectable} from '@angular/core';
import {API_LINK} from '../shared/tokens/api-link.token';
import {HttpClient} from '@angular/common/http';
import {User} from './types/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(@Inject(API_LINK) private readonly apiLink: string,
              private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<User[]>(`${this.apiLink}/users`);
  }

  updateUser(updatedUser: User): Observable<User>{
    return this.httpClient.put<User>(`${this.apiLink}/users/${updatedUser.id}`, updatedUser);
  }
}
