import ECommerceApi from '../../../api/e-commerce-api';
import MainView from '../view/view';

export default class MainModel {
  protected view: MainView;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new MainView();
  }

  public getPromoCode(): void {
    this.view.showPromo();
  }
}
