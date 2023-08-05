class Controller {
  public getTest(event: MouseEvent): void {
    console.log('Controller connected');
    console.log(event.target);
  }
}

export default Controller;
