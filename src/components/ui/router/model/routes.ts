import { Pages } from '../../../models/router';
import createTemplateAboutUs from '../../about_us/view/template';
import createTemplateCatalog from '../../catalog/view/template';
import createTemplateLogin from '../../login/view/template';
import { createTemplateMain } from '../../main/view/template';
import createTemplateNotFound from '../../not_found/view/template';
import createTemplateProfile from '../../profile/view/template';
import createTemplateRegistration from '../../registration/view/template';

const basicRoutes = [
  {
    path: ``,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateMain(isLoggedIn);
    },
  },
  {
    path: `${Pages.MAIN}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateMain(isLoggedIn);
    },
  },
  {
    path: `${Pages.LOGIN}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateLogin(isLoggedIn);
    },
  },
  {
    path: `${Pages.REGISTRATION}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateRegistration(isLoggedIn);
    },
  },
  {
    path: `${Pages.CATALOG}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateCatalog(isLoggedIn);
    },
  },
  {
    path: `${Pages.CATALOG}/${Pages.ID}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateCatalog(isLoggedIn);
    },
  },
  {
    path: `${Pages.PROFILE}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateProfile(isLoggedIn);
    },
  },
  {
    path: `${Pages.NOT_FOUND}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateNotFound(isLoggedIn);
    },
  },
  {
    path: `${Pages.ABOUT_US}`,
    callback: (isLoggedIn?: boolean): void => {
      createTemplateAboutUs(isLoggedIn);
    },
  },
];

export default basicRoutes;
