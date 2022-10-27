class Todo {
    constructor (buttonCreateItem, contentTextArea, listOfTask){
        this.buttonCreateItem= document.querySelector(buttonCreateItem);
        this.contentTextArea= document.querySelector(contentTextArea);
        this.listOfTask= document.querySelector(listOfTask);

        this.buttonCreateItem.addEventListener("click", this.createItemsOfList.bind(null, this.contentTextArea, this.listOfTask));
    }

    createItemsOfList(contentTextArea, listOfTask){
        contentTextArea= contentTextArea.value;
        let task= document.createElement("li");
        task.append(contentTextArea);
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

        listOfTask.append(task);
    }
}
new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list");

import lessFiles from './styles/main.less';
import htmlFiles from './pages/index.pug';