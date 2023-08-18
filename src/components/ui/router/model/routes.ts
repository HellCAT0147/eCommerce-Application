import { Pages } from '../../../models/router';
import createTemplateLogin from '../../login/view/template';
import createTemplate from '../../main/view/template';
import createTemplateNotFound from '../../not_found/view/template';
import createTemplateRegistration from '../../registration/view/template';

const basicRoutes = [
  {
    path: ``,
    callback: (login?: boolean): void => {
      createTemplate(login);
    },
  },
  {
    path: `${Pages.MAIN}`,
    callback: (login?: boolean): void => {
      createTemplate(login);
    },
  },
  {
    path: `${Pages.LOGIN}`,
    callback: (login?: boolean): void => {
      createTemplateLogin(login);
    },
  },
  {
    path: `${Pages.REGISTRATION}`,
    callback: (login?: boolean): void => {
      createTemplateRegistration(login);
    },
  },
  {
    path: `${Pages.NOT_FOUND}`,
    callback: (login?: boolean): void => {
      createTemplateNotFound(login);
    },
  },
];

export default basicRoutes;
