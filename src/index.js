import Todo from './components/todo/todo.js';

const arrayOfIdentifiers= ["#firstComponent", "#secondComponent", "#thirdComponent", "#fourthComponent"];
arrayOfIdentifiers.forEach(currentElement => {
    new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", currentElement);
});
/*
new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", "#firstComponent");
new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", "#secondComponent");
new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", "#thirdComponent");
new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", "#fourthComponent");
*/
import lessFiles from './styles/main.less';
import htmlFiles from './pages/index.pug';