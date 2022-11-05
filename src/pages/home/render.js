import Todo from '../../components/todo/todo.js';

const todo1= new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", ".TODO-container__counter", "#firstComponent");
const todo2= new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", ".TODO-container__counter", "#secondComponent");
const todo3= new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", ".TODO-container__counter", "#thirdComponent");
const todo4= new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list", ".TODO-container__counter", "#fourthComponent");

export {todo1, todo2, todo3, todo4};