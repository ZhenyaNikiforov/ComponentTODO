/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/todo/todo.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Todo = /*#__PURE__*/function () {
  function Todo(buttonCreateItem, classTextArea, classListOfTask) {
    _classCallCheck(this, Todo);

    this.buttonCreateItem = this.variablesDefinition(buttonCreateItem); //document.querySelector(buttonCreateItem);

    this.classTextArea = classTextArea;
    this.classListOfTask = classListOfTask;
    this.buttonCreateItem.addEventListener("click", this.handleButtonClick.bind(this, this.classTextArea, this.classListOfTask));
  }

  _createClass(Todo, [{
    key: "handleButtonClick",
    value: function handleButtonClick(classTextArea, classListOfTask) {
      var textElement = this.variablesDefinition(classTextArea);
      var textContent = textElement.value;

      if (textContent != "") {
        var task = document.createElement("li");
        task.append(textContent);
        task.classList.add("TODO-container__list-item");
        var closeButton = document.createElement("button");
        closeButton.classList.add("TODO-container__close-button");
        closeButton.addEventListener("click", function () {
          this.parentNode.remove();
        });
        var crist = document.createElement("span");
        crist.classList.add("TODO-container__crist");
        crist.textContent = "+";
        closeButton.append(crist);
        task.append(closeButton);
        var listOfTask = this.variablesDefinition(classListOfTask);
        listOfTask.append(task);
        textElement.value = "";
      } else {
        alert("Введите символы в текстовое поле!");
      }
    }
  }, {
    key: "variablesDefinition",
    value: function variablesDefinition(className) {
      return document.querySelector(className);
    }
  }]);

  return Todo;
}();

/* harmony default export */ const todo = ({
  Todo: Todo
});
;// CONCATENATED MODULE: ./src/index.js

new todo.Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list");


/******/ })()
;