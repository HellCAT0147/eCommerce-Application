import ControllerMain from '../controller';

const controllerMain: ControllerMain = new ControllerMain();

test('controllerMain is instance of ControllerMain', () => {
  expect(controllerMain).toBeInstanceOf(ControllerMain);
});
