import { boundMethod } from 'autobind-decorator';

class Todo {
  public sel: string;

  public domElementWrapper: HTMLElement;

  public button: HTMLButtonElement | null = null;

  public textArea: HTMLTextAreaElement | null = null;

  public listTask: HTMLUListElement | null = null;

  public counterTask: HTMLParagraphElement | null = null;

  constructor(domElementWrap: Element) {
    this.sel = 'todo-container';
    this.domElementWrapper = <HTMLElement>domElementWrap;
    this.init();
  }

  public init() {
    this.button = this.setDomElement(`.js-${this.sel}__button`) as HTMLButtonElement;
    this.textArea = this.setDomElement(`.js-${this.sel}__text`) as HTMLTextAreaElement;
    this.listTask = this.setDomElement(`.js-${this.sel}__list`) as HTMLUListElement;
    this.counterTask = this.setDomElement(`.js-${this.sel}__counter`) as HTMLParagraphElement;

    this.bindEvent();
  }

  public bindEvent() {
    if (!this.button || !this.textArea) return false;

    this.button.addEventListener('click', this.handleButtonClick);
    this.textArea.addEventListener('input', this.handleFieldInput);

    return true;
  }

  public setDomElement(selectorName: string) {
    return this.domElementWrapper.querySelector(selectorName);
  }

  @boundMethod
  public handleButtonClick() {
    if (!this.textArea || !this.listTask) return false;

    const task = document.createElement('li');
    const closeButton = document.createElement('button');
    const cross = document.createElement('span');

    task.append(this.textArea.value);
    task.classList.add(`${this.sel}__list-item`);

    closeButton.classList.add(`${this.sel}__close-button`);

    cross.classList.add(`${this.sel}__cross`);
    cross.textContent = '+';

    closeButton.append(cross);
    task.append(closeButton);
    this.listTask.append(task);

    closeButton.addEventListener('click', this.handleCloseButtonClick);

    this.textArea.value = '';

    if (!this.counterTask || !this.button) return false;

    const numberDescendants = this.listTask.childElementCount;
    if (this.counterTask.lastElementChild) {
      this.counterTask.lastElementChild.textContent = String(numberDescendants);
    }

    this.button.classList.remove(`${this.sel}__button_permitted`);
    this.button.setAttribute('disabled', 'true');

    return true;
  }

  @boundMethod
  public handleCloseButtonClick(Event: MouseEvent) {
    if (!this.listTask || !this.counterTask) return false;

    const button = <HTMLButtonElement>Event.currentTarget;
    const li = <HTMLLIElement>button.parentNode;
    li.remove();

    const remainingTasks = this.listTask.childElementCount;
    if (this.counterTask.lastElementChild) {
      this.counterTask.lastElementChild.textContent = String(remainingTasks);
    }
    return true;
  }

  @boundMethod
  public handleFieldInput() {
    const buttonClass = `${this.sel}__button_permitted`;

    if (!this.textArea || !this.button) return false;

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
