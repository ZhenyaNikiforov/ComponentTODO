import { boundMethod } from 'autobind-decorator';

class Todo {
  private selectorName: string;

  private domElementWrapper: HTMLElement | null = null;

  private button: HTMLButtonElement | null = null;

  private textArea: HTMLTextAreaElement | null = null;

  private listTask: HTMLUListElement | null = null;

  private counterTask: HTMLParagraphElement | null = null;

  constructor(domElementWrap: Element) {
    this.selectorName = '.js-todo-container';

    this.domElementWrapper = domElementWrap as HTMLElement | null;
    this.init();
  }

  private init() {
    this.button = this.setDomElement(`${this.selectorName}__button`) as HTMLButtonElement | null;
    this.textArea = this.setDomElement(`${this.selectorName}__text`) as HTMLTextAreaElement | null;
    this.listTask = this.setDomElement(`${this.selectorName}__list`) as HTMLUListElement | null;

    this.counterTask = this.setDomElement(
      `${this.selectorName}__counter`,
    ) as HTMLParagraphElement | null;

    this.bindEvent();
  }

  private bindEvent() {
    if (!this.button || !this.textArea) {
      return false;
    }

    this.button.addEventListener('click', this.handleButtonClick);
    this.textArea.addEventListener('input', this.handleFieldInput);

    return true;
  }

  private setDomElement(selectorName: string) {
    if (!this.domElementWrapper) {
      return null;
    }

    return this.domElementWrapper.querySelector(selectorName);
  }

  @boundMethod
  private handleButtonClick() {
    if (!this.textArea || !this.listTask) {
      return false;
    }

    const task = document.createElement('li');
    const closeButton = document.createElement('button');
    const cross = document.createElement('span');

    const baseClass = this.selectorName.replace('.js-', '');

    task.append(this.textArea.value);
    task.classList.add(`${baseClass}__list-item`);

    closeButton.classList.add(
      `${baseClass}__close-button`,
    );

    cross.classList.add(`${baseClass}__cross`);
    cross.textContent = '+';

    closeButton.append(cross);
    task.append(closeButton);
    this.listTask.append(task);

    closeButton.addEventListener('click', this.handleCloseButtonClick);

    this.textArea.value = '';

    if (!this.counterTask || !this.button) {
      return false;
    }

    if (this.counterTask.lastElementChild) {
      const numberDescendants = this.listTask.childElementCount;
      this.counterTask.lastElementChild.textContent = String(numberDescendants);
    }

    this.button.classList.remove(
      `${baseClass}__button_permitted`,
    );
    this.button.setAttribute('disabled', 'true');

    return true;
  }

  @boundMethod
  private handleCloseButtonClick(Event: MouseEvent) {
    if (!this.listTask || !this.counterTask) {
      return false;
    }

    const button = <HTMLButtonElement>Event.currentTarget;
    const li = <HTMLLIElement>button.parentNode;
    li.remove();

    if (this.counterTask.lastElementChild) {
      const remainingTasks = this.listTask.childElementCount;
      this.counterTask.lastElementChild.textContent = String(remainingTasks);
    }

    return true;
  }

  @boundMethod
  private handleFieldInput() {
    const buttonClass = `${this.selectorName.replace('.js-', '')}__button_permitted`;

    if (!this.textArea || !this.button) {
      return false;
    }

    if (this.textArea.value !== '') {
      this.button.removeAttribute('disabled');
      this.button.classList.add(buttonClass);
    } else {
      this.button.classList.remove(buttonClass);
      this.button.setAttribute('disabled', 'true');
    }

    return true;
  }
}

export default Todo;
