export class ECommerceAPIConfig {
  public projectKey: string;

  public clientId: string;

  public clientSecret: string;

  public region: string;

  constructor() {
    this.projectKey = 'TEMPLATE';
    this.clientId = 'TEMPLATE';
    this.clientSecret = 'TEMPLATE';
    this.region = 'TEMPLATE';
  }
}

const eCommerceAPIConfig: ECommerceAPIConfig = new ECommerceAPIConfig();

export default eCommerceAPIConfig;
