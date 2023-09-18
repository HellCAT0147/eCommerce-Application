class ControllerAboutUS {
  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    e.preventDefault();
    // TODO implement delegating mouse event for about us pages
  }
}

export default ControllerAboutUS;
