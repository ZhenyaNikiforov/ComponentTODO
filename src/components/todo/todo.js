class Todo {
    constructor (domElementWrapper){
        this.domElementButton=  domElementWrapper.querySelector(".js-todo-container__button");
        this.domElementTextArea=  domElementWrapper.querySelector(".js-todo-container__text");
        this.domElementListOfTask=  domElementWrapper.querySelector(".js-todo-container__list");
        this.domElementCounterOfTask=  domElementWrapper.querySelector(".js-todo-container__counter");

        this.domElementButton.addEventListener("click", this.handleButtonClick.bind(this, this.domElementTextArea, this.domElementListOfTask, this.domElementButton, this.domElementCounterOfTask));
        this.domElementTextArea.addEventListener("input", this.handleFieldInput.bind(this, this.domElementButton, this.domElementTextArea));
    }

    handleButtonClick(domElementTextArea, domElementListOfTask, domElementButton, domElementCounterOfTask){
        const textContent= domElementTextArea.value;
        let task= document.createElement("li");
        task.append(textContent);
        task.classList.add("todo-container__list-item");
        
        let closeButton= document.createElement("button");
        closeButton.classList.add("todo-container__close-button");
        closeButton.addEventListener("click", function(){
            this.parentNode.remove();
            const remainingTasks= domElementListOfTask.childElementCount;
            domElementCounterOfTask.lastElementChild.textContent= remainingTasks;
        });
        
        const crist= document.createElement("span");
        crist.classList.add("todo-container__crist");
        crist.textContent="+";
        
        closeButton.append(crist);
        task.append(closeButton);

        domElementListOfTask.append(task);
        domElementTextArea.value= "";
        domElementButton.classList.remove("todo-container__button_permitted");
        domElementButton.setAttribute('disabled', 'disabled');

        const numberOfDescendants= domElementListOfTask.childElementCount;
        domElementCounterOfTask.lastElementChild.textContent= numberOfDescendants;
    }

    handleFieldInput(domElementButton, domElementTextArea){
        if(domElementTextArea.value != ""){
            domElementButton.removeAttribute('disabled');
            domElementButton.classList.add("todo-container__button_permitted");
        }else{
            domElementButton.classList.remove("todo-container__button_permitted");
            domElementButton.setAttribute('disabled', 'disabled');
        }
    }
}

export default Todo;