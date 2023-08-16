class ControllerRegistration {
  public checkField(e: Event): void {
    e.preventDefault();
    // TODO create controller for registration page;
  }

  public buttonEvent(e: Event): void {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    const showPassword: HTMLButtonElement | null = target.closest('#show-password');
    if (showPassword) {
      e.preventDefault();
      // TODO create method for show password;
    }

    const signIn: HTMLButtonElement | null = target.closest('.registration__button_create');
    if (signIn) {
      e.preventDefault();
      // TODO create method for send registration request;
    }
  }
}

export default ControllerRegistration;
