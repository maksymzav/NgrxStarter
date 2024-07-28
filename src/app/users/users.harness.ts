import {ComponentHarness} from '@angular/cdk/testing';
import {MatHeaderCellHarness, MatHeaderRowHarness, MatRowHarness} from '@angular/material/table/testing';

export class UsersHarness extends ComponentHarness {
  static hostSelector = 'app-users';

  private getHeaderRowHarness = this.locatorFor(MatHeaderRowHarness);
  private getRowHarnesses = this.locatorForAll(MatRowHarness);

  async getColumnTitles(): Promise<string[]> {
    const headerRowHarness = await this.getHeaderRowHarness();
    const cells = await headerRowHarness.getCells();
    return Promise.all(cells.map((cellHarness: MatHeaderCellHarness) => cellHarness.getText()));
  }

  async getCellsDataForRow(index: number) {
    const rowHarnesses = await this.getRowHarnesses();
    const rowHarness = rowHarnesses.at(index);
    if (typeof rowHarness === 'undefined') {
      throw Error(`row with index ${index} does not exist`);
    }
    const cells = await rowHarness.getCells();
    return Promise.all(cells.map((cellHarness: MatHeaderCellHarness) => cellHarness.getText()));
  }
}
