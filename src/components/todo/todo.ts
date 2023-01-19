import { boundMethod } from 'autobind-decorator';

class Todo {
  protected selectorName: string;

  protected oldValue: string;

  protected newValue: string;

  protected domElementWrapper: HTMLElement | null = null;

  protected button: HTMLButtonElement | null = null;

  protected textArea: HTMLTextAreaElement | null = null;

  protected listTask: HTMLUListElement | null = null;

  protected counterTask: HTMLParagraphElement | null = null;

  constructor(domElementWrap: Element) {
    this.selectorName = '.js-todo-container';
    this.oldValue = '.js-';
    this.newValue = '';

    this.domElementWrapper = domElementWrap as HTMLElement | null;
    this.init();
  }

  protected init() {
    this.button = this.setDomElement(`${this.selectorName}__button`) as HTMLButtonElement | null;
    this.textArea = this.setDomElement(`${this.selectorName}__text`) as HTMLTextAreaElement | null;
    this.listTask = this.setDomElement(`${this.selectorName}__list`) as HTMLUListElement | null;

    this.counterTask = this.setDomElement(
      `${this.selectorName}__counter`,
    ) as HTMLParagraphElement | null;

    this.bindEvent();
  }

  protected bindEvent() {
    if (!this.button || !this.textArea) {
      return false;
    }

    this.button.addEventListener('click', this.handleButtonClick);
    this.textArea.addEventListener('input', this.handleFieldInput);

    return true;
  }

  protected setDomElement(selectorName: string) {
    if (!this.domElementWrapper) {
      return null;
    }

    return this.domElementWrapper.querySelector(selectorName);
  }

  @boundMethod
  protected handleButtonClick() {
    if (!this.textArea || !this.listTask) {
      return false;
    }

    const task = document.createElement('li');
    const closeButton = document.createElement('button');
    const cross = document.createElement('span');

    task.append(this.textArea.value);
    task.classList.add(`${this.selectorName.replace(this.oldValue, this.newValue)}__list-item`);

    closeButton.classList.add(
      `${this.selectorName.replace(this.oldValue, this.newValue)}__close-button`,
    );

    cross.classList.add(`${this.selectorName.replace(this.oldValue, this.newValue)}__cross`);
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
      `${this.selectorName.replace(this.oldValue, this.newValue)}__button_permitted`,
    );
    this.button.setAttribute('disabled', 'true');

    return true;
  }

  @boundMethod
  protected handleCloseButtonClick(Event: MouseEvent) {
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
  protected handleFieldInput() {
    const buttonClass = `${this.selectorName.replace(this.oldValue, this.newValue)}__button_permitted`;

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
