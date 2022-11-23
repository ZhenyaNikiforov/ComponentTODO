import {boundMethod} from 'autobind-decorator';

class Todo {

    selectorTextArea= '.js-todo-container__text';
    selectorButton= '.js-todo-container__button';
    selectorListOfTask= '.js-todo-container__list';
    selectorCounterOfTask= '.js-todo-container__counter';

    constructor (domElementWrapper){
        this.domElementWrapper= domElementWrapper;
        this.init();
    }
    
    init(){
        this.elementButton= this.setDomElement(this.selectorButton);
        this.elementTextArea= this.setDomElement(this.selectorTextArea);
        this.elementListOfTask= this.setDomElement(this.selectorListOfTask);
        this.elementCounterOfTask= this.setDomElement(this.selectorCounterOfTask);

        this.handleButtonClick();
        this.handleFieldInput();
    }

    setDomElement(selectorName){
        return this.domElementWrapper.querySelector(selectorName);
    }

    handleButtonClick(){
        this.elementButton.addEventListener('click', this.creatingATask);
    }

    @boundMethod
    creatingATask(){
        const textContent= this.elementTextArea.value;
        let task= document.createElement('li');
        task.append(textContent);
        task.classList.add('todo-container__list-item');
        
        let closeButton= document.createElement('button');
        closeButton.classList.add("todo-container__close-button");

        const cross= document.createElement('span');
        cross.classList.add("todo-container__cross");
        cross.textContent="+";

        closeButton.append(cross);
        task.append(closeButton);
        this.elementListOfTask.append(task);

        closeButton.addEventListener('click', this.removeTask);
        closeButton.addEventListener('click', this.decrementCounter);

        this.elementTextArea.value= '';

        const numberOfDescendants= this.elementListOfTask.childElementCount;
        this.elementCounterOfTask.lastElementChild.textContent= numberOfDescendants;

        this.elementButton.classList.remove('todo-container__button_permitted');
        this.elementButton.setAttribute('disabled', 'disabled');
    }

    removeTask(){
        this.parentNode.remove();
    }

    @boundMethod
    decrementCounter(){
        const remainingTasks= this.elementListOfTask.childElementCount;
        this.elementCounterOfTask.lastElementChild.textContent= remainingTasks;
    }

    handleFieldInput(){
        this.elementTextArea.addEventListener('input', this.buttonControl)
    }

    @boundMethod
    buttonControl(){
        if(this.elementTextArea.value !=''){
            this.elementButton.removeAttribute('disabled');
            this.elementButton.classList.add('todo-container__button_permitted');
        }else{
            this.elementButton.classList.remove('todo-container__button_permitted');
            this.elementButton.setAttribute('disabled', 'disabled');
        }
    }
    /*handleFieldInput(domElementWrapper){
        if(textArea.value != ""){
            button.removeAttribute('disabled');
            button.classList.add("todo-container__button_permitted");
        }else{
            button.classList.remove("todo-container__button_permitted");
            button.setAttribute('disabled', 'disabled');
        }
    }*/   
}

export default Todo;