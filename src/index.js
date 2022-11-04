import Todo from './components/todo/todo.js';

const arrayOfIdentifiers= ["#firstComponent", "#secondComponent", "#thirdComponent", "#fourthComponent"];
arrayOfIdentifiers.forEach(currentElement => {
    new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", ".TODO-container__counter", currentElement);
});

import lessFiles from './styles/main.less';
import htmlFiles from './pages/index.pug';