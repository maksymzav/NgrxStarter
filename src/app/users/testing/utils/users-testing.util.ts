import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UsersComponent} from '../../users.component';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {API_LINK} from '../../../shared/tokens/api-link.token';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {UsersHarness} from '../../users.harness';
import {getRandomInteger} from '../../../shared/utils/get-random-integer';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {User} from '../../user.interface';

const apiLink = 'myApi' + getRandomInteger();

export class UsersTestingUtil {
  static twoUsersList = [
    {id: 0, name: 'api-name1', username: 'api-username1', email: 'api-email1@test.com'},
    {id: 1, name: 'api-name2', username: 'api-username2', email: 'api-email2@test.com'},
  ] satisfies User[];
  component!: UsersComponent;
  fixture!: ComponentFixture<UsersComponent>;
  usersHarness!: UsersHarness;
  httpMock!: HttpTestingController;

  async compileComponent() {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: API_LINK, useValue: apiLink},
        provideNoopAnimations(),
      ]
    })
      .compileComponents();

    this.fixture = TestBed.createComponent(UsersComponent);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();

    this.usersHarness = await TestbedHarnessEnvironment.harnessForFixture(this.fixture, UsersHarness);
    this.httpMock = TestBed.inject(HttpTestingController);
  }

  mockUsersCall(data: User[]) {
    let req = this.httpMock.expectOne(`${apiLink}/users`);
    expect(req.request.method).toBe('GET');

    req.flush(data);
    this.httpMock.verify();
  }
}
