import { Pages } from '../../../models/router';
import createTemplateCatalog from '../../catalog/view/template';
import createTemplateLogin from '../../login/view/template';
import { createTemplateMain } from '../../main/view/template';
import createTemplateNotFound from '../../not_found/view/template';
import createTemplateRegistration from '../../registration/view/template';

const basicRoutes = [
  {
    path: ``,
    callback: (isloggedIn?: boolean): void => {
      createTemplateMain(isloggedIn);
    },
  },
  {
    path: `${Pages.MAIN}`,
    callback: (isloggedIn?: boolean): void => {
      createTemplateMain(isloggedIn);
    },
  },
  {
    path: `${Pages.LOGIN}`,
    callback: (isloggedIn?: boolean): void => {
      createTemplateLogin(isloggedIn);
    },
  },
  {
    path: `${Pages.REGISTRATION}`,
    callback: (isloggedIn?: boolean): void => {
      createTemplateRegistration(isloggedIn);
    },
  },
  {
    path: `${Pages.CATALOG}`,
    callback: (isloggedIn?: boolean): void => {
      createTemplateCatalog(isloggedIn);
    },
  },
  {
    path: `${Pages.NOT_FOUND}`,
    callback: (isloggedIn?: boolean): void => {
      createTemplateNotFound(isloggedIn);
    },
  },
];

export default basicRoutes;
