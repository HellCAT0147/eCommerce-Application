import ControllerAboutUS from '../controller';

const Controller: ControllerAboutUS = new ControllerAboutUS();

test('Controller is instance of ControllerAboutUS', () => {
  expect(Controller).toBeInstanceOf(ControllerAboutUS);
});
