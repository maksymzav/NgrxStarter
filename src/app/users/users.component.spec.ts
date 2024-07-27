import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {UsersHarness} from './users.harness';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersHarness: UsersHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent]
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
    const firstRowData = await usersHarness.getCellsDataForRow(0);
    const secondRowData = await usersHarness.getCellsDataForRow(1);

    expect(firstRowData).toEqual(['0', 'name1', 'username1', 'email1@test.com']);
    expect(secondRowData).toEqual(['1', 'name2', 'username2', 'email2@test.com']);

  });
});
