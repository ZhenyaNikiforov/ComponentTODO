class Todo {
    constructor (componentClass){
        this.domElementButton= this.getDomElement(componentClass, ".TODO-container__button");
        this.domElementTextArea= this.getDomElement(componentClass, ".TODO-container__text");
        this.domElementListOfTask= this.getDomElement(componentClass, ".TODO-container__list");
        this.domElementCounterOfTask= this.getDomElement(componentClass, ".TODO-container__counter")

        this.domElementButton.addEventListener("click", this.handleButtonClick.bind(this, this.domElementTextArea, this.domElementListOfTask, this.domElementButton, this.domElementCounterOfTask));
        this.domElementTextArea.addEventListener("input", this.handleFieldInput.bind(this, this.domElementButton, this.domElementTextArea));
    }

    handleButtonClick(domElementTextArea, domElementListOfTask, domElementButton, domElementCounterOfTask){
        const textContent= domElementTextArea.value;
        if(textContent != ""){
            let task= document.createElement("li");
            task.append(textContent);
            task.classList.add("TODO-container__list-item");
            
            let closeButton= document.createElement("button");
            closeButton.classList.add("TODO-container__close-button");
            closeButton.addEventListener("click", function(){
                this.parentNode.remove();
                const remainingTasks= domElementListOfTask.childElementCount;
                domElementCounterOfTask.lastElementChild.textContent= remainingTasks;
            });
            
            const crist= document.createElement("span");
            crist.classList.add("TODO-container__crist");
            crist.textContent="+";
            
            closeButton.append(crist);
            task.append(closeButton);
    
            domElementListOfTask.append(task);
            domElementTextArea.value= "";
            domElementButton.classList.remove("TODO-container__button_permitted");

            const numberOfDescendants= domElementListOfTask.childElementCount;
            domElementCounterOfTask.lastElementChild.textContent= numberOfDescendants;
        }else{
            alert("Введите символы в текстовое поле!");
        }
    }
    getDomElement(componentClass, className){
        const space= " ";
        const argument= componentClass + space + className;
        return document.querySelector(argument);
    }
    handleFieldInput(domElementButton, domElementTextArea){
        if(domElementTextArea.value != ""){
            domElementButton.classList.add("TODO-container__button_permitted");
        }else{
            domElementButton.classList.remove("TODO-container__button_permitted");
        }
    }
}

export default Todo;