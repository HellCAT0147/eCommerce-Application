import { ECommerceAPIConfig } from './e-commerce-api-config';

const eCommerceAPIConfig: ECommerceAPIConfig = {
  projectKey: process.env.COMMERCE_TOOLS_PROJECT_KEY || '',
  clientId: process.env.COMMERCE_TOOLS_CLIENT_ID || '',
  clientSecret: process.env.COMMERCE_TOOLS_CLIENT_SECRET || '',
  region: process.env.COMMERCE_TOOLS_REGION || '',
  scopes: process.env.COMMERCE_TOOLS_SCOPES || '',
};

export default eCommerceAPIConfig;
