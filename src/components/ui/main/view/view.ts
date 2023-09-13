import { Pages } from '../../../models/router';

export default class MainView {
  private pageName: string;

  public constructor(pageName: string = Pages.MAIN) {
    this.pageName = pageName;
  }
}
