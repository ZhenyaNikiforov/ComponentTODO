import { boundMethod } from 'autobind-decorator';

class Todo {
  jsTodoContainer = '.js-todo-container';

  todoContainer = 'todo-container';

  public selectorTextArea = `${this.jsTodoContainer}__text`;

  public selectorButton = `${this.jsTodoContainer}__button`;

  public selectorListTask = `${this.jsTodoContainer}__list`;

  public selectorCounterTask = `${this.jsTodoContainer}__counter`;

  domElementWrapper: HTMLElement;

  public button: HTMLButtonElement | null = null;

  public textArea: HTMLTextAreaElement | null = null;

  public listTask: HTMLUListElement | null = null;

  public counterTask: HTMLParagraphElement | null = null;

  constructor(domElementWrap: Element) {
    this.domElementWrapper = <HTMLElement>domElementWrap;
    this.init();
  }

  public init() {
    this.button = <HTMLButtonElement> this.setDomElement(this.selectorButton);
    this.textArea = <HTMLTextAreaElement> this.setDomElement(this.selectorTextArea);
    this.listTask = <HTMLUListElement> this.setDomElement(this.selectorListTask);
    this.counterTask = <HTMLParagraphElement> this.setDomElement(this.selectorCounterTask);

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
    if (!this.textArea || !this.listTask) return;
    if (!this.counterTask || !this.button) return;

    const task: HTMLLIElement = document.createElement('li');
    const closeButton: HTMLButtonElement = document.createElement('button');
    const cross: HTMLSpanElement = document.createElement('span');

    task.append(this.textArea.value);
    task.classList.add(`${this.todoContainer}__list-item`);

    closeButton.classList.add(`${this.todoContainer}__close-button`);

    cross.classList.add(`${this.todoContainer}__cross`);
    cross.textContent = '+';

    closeButton.append(cross);
    task.append(closeButton);
    this.listTask.append(task);

    closeButton.addEventListener('click', this.handleCloseButtonClick);

    this.textArea.value = '';

    const numberDescendants: number = this.listTask.childElementCount;
    if (this.counterTask.lastElementChild) {
      this.counterTask.lastElementChild.textContent = String(numberDescendants);
    }

    this.button.classList.remove(`${this.todoContainer}__button_permitted`);
    this.button.setAttribute('disabled', 'true');
  }

  @boundMethod
  public handleCloseButtonClick(Event: MouseEvent) {
    if (!this.listTask || !this.counterTask) return;

    const button = <HTMLButtonElement>Event.currentTarget;
    const li = <HTMLLIElement>button.parentNode;
    li.remove();

    const remainingTasks: number = this.listTask.childElementCount;
    if (this.counterTask.lastElementChild) {
      this.counterTask.lastElementChild.textContent = String(remainingTasks);
    }
  }

  @boundMethod
  public handleFieldInput() {
    const BUTTON_CLASS = `${this.todoContainer}__button_permitted`;

    if (!this.textArea || !this.button) return;

    if (this.textArea.value !== '') {
      this.button.removeAttribute('disabled');
      this.button.classList.add(BUTTON_CLASS);
    } else {
      this.button.classList.remove(BUTTON_CLASS);
      this.button.setAttribute('disabled', 'true');
    }
  }
}

export default Todo;
