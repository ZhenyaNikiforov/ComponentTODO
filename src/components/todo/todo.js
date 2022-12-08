import { boundMethod } from 'autobind-decorator';

class Todo {
  selectorTextArea = '.js-todo-container__text';

  selectorButton = '.js-todo-container__button';

  selectorListTask = '.js-todo-container__list';

  selectorCounterTask = '.js-todo-container__counter';

  constructor(domElementWrapper) {
    this.domElementWrapper = domElementWrapper;
    this.init();
  }

  init() {
    this.button = this.setDomElement(this.selectorButton);
    this.textArea = this.setDomElement(this.selectorTextArea);
    this.listTask = this.setDomElement(this.selectorListTask);
    this.counterTask = this.setDomElement(this.selectorCounterTask);

    this.bindEvent();
  }

  // eslint-disable-next-line consistent-return
  bindEvent() {
    // eslint-disable-next-line no-bitwise
    if (!this.button | !this.textArea) {
      return false;
    }
    this.button.addEventListener('click', this.handleButtonClick);
    this.textArea.addEventListener('input', this.handleFieldInput);
  }

  setDomElement(selectorName) {
    return this.domElementWrapper.querySelector(selectorName);
  }

  @boundMethod
  handleButtonClick() {
    const task = document.createElement('li');
    task.append(this.textArea.value);
    task.classList.add('todo-container__list-item');

    const closeButton = document.createElement('button');
    closeButton.classList.add('todo-container__close-button');

    const cross = document.createElement('span');
    cross.classList.add('todo-container__cross');
    cross.textContent = '+';

    closeButton.append(cross);
    task.append(closeButton);
    this.listTask.append(task);

    closeButton.addEventListener('click', this.handleCloseButtonClick);

    this.textArea.value = '';

    const numberOfDescendants = this.listTask.childElementCount;
    this.counterTask.lastElementChild.textContent = numberOfDescendants;

    this.button.classList.remove('todo-container__button_permitted');
    this.button.setAttribute('disabled', 'true');
  }

  @boundMethod
  handleCloseButtonClick(Event) {
    Event.currentTarget.parentNode.remove();

    const remainingTasks = this.listTask.childElementCount;
    this.counterTask.lastElementChild.textContent= remainingTasks;
  }

  @boundMethod
  handleFieldInput() {
    if (this.textArea.value !== '') {
      this.button.removeAttribute('disabled');
      this.button.classList.add('todo-container__button_permitted');
    } else {
      this.button.classList.remove('todo-container__button_permitted');
      this.button.setAttribute('disabled', 'true');
    }
  }
}

export default Todo;
