import { boundMethod } from 'autobind-decorator';

class Todo {
  selectorTextArea = '.js-todo-container__text';

  selectorButton = '.js-todo-container__button';

  selectorListTask = '.js-todo-container__list';

  selectorCounterTask = '.js-todo-container__counter';
  
  domElementWrapper: HTMLElement;
  button: HTMLElement | undefined;
  textArea: HTMLTextAreaElement | undefined;
  listTask: HTMLElement | undefined;
  counterTask: HTMLElement | undefined;

  constructor(domElementWrap: Element) {
    this.domElementWrapper = <HTMLElement>domElementWrap;
    this.init();
  }

  init() {
    this.button = this.setDomElement(this.selectorButton);
    this.textArea = <HTMLTextAreaElement>this.setDomElement(this.selectorTextArea);
    this.listTask = this.setDomElement(this.selectorListTask);
    this.counterTask = this.setDomElement(this.selectorCounterTask);

    this.bindEvent();
  }

  bindEvent() {
    if (!this.button || !this.textArea) {
      return false;
    }
    this.button.addEventListener('click', this.handleButtonClick);
    this.textArea.addEventListener('input', this.handleFieldInput);
    return true;
  }

  setDomElement(selectorName: string) {

    const typeElement = this.domElementWrapper.querySelector(selectorName);
    if (typeElement !== null) {
      return <HTMLElement>typeElement;
    }
  }

  @boundMethod
  handleButtonClick() {
    if ((this.textArea !== undefined) && (this.listTask !== undefined) && (this.counterTask !== undefined) && (this.button !== undefined)) {
      const task: HTMLLIElement = document.createElement('li');
      task.append(this.textArea.value);
      task.classList.add('todo-container__list-item');

      const closeButton: HTMLButtonElement = document.createElement('button');
      closeButton.classList.add('todo-container__close-button');

      const cross: HTMLSpanElement = document.createElement('span');
      cross.classList.add('todo-container__cross');
      cross.textContent = '+';

      closeButton.append(cross);
      task.append(closeButton);
      this.listTask.append(task);

      closeButton.addEventListener('click', this.handleCloseButtonClick);

      this.textArea.value = '';

      const numberDescendants: number = this.listTask.childElementCount;
      if (this.counterTask.lastElementChild !== null) {
        this.counterTask.lastElementChild.textContent = String(numberDescendants);
      }

      this.button.classList.remove('todo-container__button_permitted');
      this.button.setAttribute('disabled', 'true');
    }
  }

    

  @boundMethod
  handleCloseButtonClick(Event: MouseEvent) {
    if ((this.listTask !== undefined) && (this.counterTask !== undefined)) {
      const button = <HTMLButtonElement>Event.currentTarget;
      const li = <HTMLLIElement>button.parentNode;
      li.remove();
  
      const remainingTasks: number = this.listTask.childElementCount;
      if (this.counterTask.lastElementChild !== null) {
        this.counterTask.lastElementChild.textContent = String(remainingTasks);
      }
    }
  }

  @boundMethod
  handleFieldInput() {
    const BUTTON_CLASS = 'todo-container__button_permitted';
    
    if ((this.textArea !== undefined) && (this.button !== undefined)) {
      if (this.textArea.value !== '') {
        this.button.removeAttribute('disabled');
        this.button.classList.add(BUTTON_CLASS);
      } else {
        this.button.classList.remove(BUTTON_CLASS);
        this.button.setAttribute('disabled', 'true');
      }
    } 
  }
}

export default Todo;
