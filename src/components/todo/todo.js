class Todo {
    constructor (domElementWrapper){
        this.domElementButton=  domElementWrapper.querySelector(this.selectorButton);
        this.domElementTextArea=  domElementWrapper.querySelector(this.selectorTextArea);

        this.domElementButton.addEventListener("click", this.handleButtonClick.bind(this, domElementWrapper));
        this.domElementTextArea.addEventListener("input", this.handleFieldInput.bind(this, domElementWrapper));
    }

    handleButtonClick(domElementWrapper){
        const textArea= domElementWrapper.querySelector(this.selectorTextArea);
        const textContent= textArea.value;
        let task= document.createElement("li");
        task.append(textContent);
        task.classList.add("todo-container__list-item");
        
        let closeButton= document.createElement("button");
        closeButton.classList.add("todo-container__close-button");

        const tasks= domElementWrapper.querySelector(this.selectorListOfTask)
        const counter= domElementWrapper.querySelector(this.selectorCounterOfTask)

        closeButton.addEventListener("click", function(){
            this.parentNode.remove();
            const remainingTasks= tasks.childElementCount;
            counter.lastElementChild.textContent= remainingTasks;
        });
        
        const cross= document.createElement("span");
        cross.classList.add("todo-container__cross");
        cross.textContent="+";
        
        closeButton.append(cross);
        task.append(closeButton);

        domElementWrapper.querySelector(this.selectorListOfTask).append(task);
        textArea.value= "";
        domElementWrapper.querySelector(this.selectorButton).classList.remove("todo-container__button_permitted");
        domElementWrapper.querySelector(this.selectorButton).setAttribute('disabled', 'disabled');

        const numberOfDescendants= domElementWrapper.querySelector(this.selectorListOfTask).childElementCount;
        domElementWrapper.querySelector(this.selectorCounterOfTask).lastElementChild.textContent= numberOfDescendants;
    }

    handleFieldInput(domElementWrapper){
        const textArea= domElementWrapper.querySelector(this.selectorTextArea);
        const button= domElementWrapper.querySelector(this.selectorButton);
        if(textArea.value != ""){
            button.removeAttribute('disabled');
            button.classList.add("todo-container__button_permitted");
        }else{
            button.classList.remove("todo-container__button_permitted");
            button.setAttribute('disabled', 'disabled');
        }
    }
    selectorTextArea= '.js-todo-container__text';
    selectorButton= '.js-todo-container__button';
    selectorListOfTask= '.js-todo-container__list';
    selectorCounterOfTask= '.js-todo-container__counter';
}

export default Todo;