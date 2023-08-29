import { Pages } from '../../../models/router';
import createTemplateCatalog from '../../catalog/view/template';
import createTemplateLogin from '../../login/view/template';
import { createTemplateMain } from '../../main/view/template';
import createTemplateNotFound from '../../not_found/view/template';
import createTemplateProfile from '../../profile/view/template';
import createTemplateRegistration from '../../registration/view/template';

const basicRoutes = [
  {
    path: ``,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateMain(isloggedIn);
    },
  },
  {
    path: `${Pages.MAIN}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateMain(isloggedIn);
    },
  },
  {
    path: `${Pages.LOGIN}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateLogin(isloggedIn);
    },
  },
  {
    path: `${Pages.REGISTRATION}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateRegistration(isloggedIn);
    },
  },
  {
    path: `${Pages.CATALOG}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateCatalog(isloggedIn);
    },
  },
  {
    path: `${Pages.CATALOG}/${Pages.ID}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateCatalog(isloggedIn, id);
    },
  },
  {
    path: `${Pages.PROFILE}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateProfile(isloggedIn);
    },
  },
  {
    path: `${Pages.NOT_FOUND}`,
    callback: (isloggedIn?: boolean, id?: string): void => {
      createTemplateNotFound(isloggedIn);
    },
  },
];

export default basicRoutes;
