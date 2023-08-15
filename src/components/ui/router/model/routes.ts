import { Pages } from '../../../models/router';
import createTemplateLogin from '../../login/view/template';
import createTemplate from '../../main/view/template';
import createTemplateNotFound from '../../not_found/view/template';
import createTemplateRegistration from '../../registration/view/template';

const basicRoutes = [
  {
    path: ``,
    callback: (): void => {
      createTemplate();
    },
  },
  {
    path: `${Pages.MAIN}`,
    callback: (): void => {
      createTemplate();
    },
  },
  {
    path: `${Pages.LOGIN}`,
    callback: (): void => {
      createTemplateLogin();
    },
  },
  {
    path: `${Pages.REGISTRATION}`,
    callback: (): void => {
      createTemplateRegistration();
    },
  },
  {
    path: `${Pages.NOT_FOUND}`,
    callback: (): void => {
      createTemplateNotFound();
    },
  },
];

export default basicRoutes;
