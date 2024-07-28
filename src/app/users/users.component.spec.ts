import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {UsersHarness} from './users.harness';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {API_LINK} from '../shared/tokens/api-link.token';
import {User} from './user.interface';
import {getRandomInteger} from '../shared/utils/get-random-integer';

const apiLink = 'myApi' + getRandomInteger();

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersHarness: UsersHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: API_LINK, useValue: apiLink},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    usersHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, UsersHarness);
  });

  it('displays a correct list of columns', async () => {
    const columnTitles = await usersHarness.getColumnTitles();
    expect(columnTitles).toEqual(['Id', 'Name', 'Username', 'Email']);
  });

  it('displays the users data', async () => {
    let httpMock = TestBed.inject(HttpTestingController);
    let req = httpMock.expectOne(`${apiLink}/users`);
    expect(req.request.method).toBe('GET');

    req.flush([
      {id: 0, name: 'api-name1', username: 'api-username1', email: 'api-email1@test.com'},
      {id: 1, name: 'api-name2', username: 'api-username2', email: 'api-email2@test.com'},
    ] satisfies User[]);

    fixture.detectChanges();
    const firstRowData = await usersHarness.getCellsDataForRow(0);
    const secondRowData = await usersHarness.getCellsDataForRow(1);

    expect(firstRowData).toEqual(['0', 'api-name1', 'api-username1', 'api-email1@test.com']);
    expect(secondRowData).toEqual(['1', 'api-name2', 'api-username2', 'api-email2@test.com']);
    httpMock.verify();
  });
});
