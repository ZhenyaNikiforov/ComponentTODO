class Todo {
    constructor (buttonCreateItem, classTextArea, classListOfTask){
        this.buttonCreateItem= this.getDomElement(buttonCreateItem); //document.querySelector(buttonCreateItem);
        this.classTextArea= classTextArea;
        this.classListOfTask= classListOfTask;

        this.buttonCreateItem.addEventListener("click", this.handleButtonClick.bind(this, this.classTextArea, this.classListOfTask));
    }

    handleButtonClick(classTextArea, classListOfTask){
        const textElement= this.getDomElement(classTextArea);
        const textContent= textElement.value;
        if(textContent != ""){
            let task= document.createElement("li");
            task.append(textContent);
            task.classList.add("TODO-container__list-item");
            
            let closeButton= document.createElement("button");
            closeButton.classList.add("TODO-container__close-button");
            closeButton.addEventListener("click", function(){
                this.parentNode.remove();
            });
            
            const crist= document.createElement("span");
            crist.classList.add("TODO-container__crist");
            crist.textContent="+";
            
            closeButton.append(crist);
            task.append(closeButton);
    
            const listOfTask= this.getDomElement(classListOfTask);
            listOfTask.append(task);
            textElement.value= "";
        }else{
            alert("Введите символы в текстовое поле!");
        }
    }
    getDomElement(className){
        return document.querySelector(className); //-variablesDefinition.
    }
}

export default Todo;