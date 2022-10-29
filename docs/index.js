/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/todo/todo.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Todo = /*#__PURE__*/function () {
  function Todo(buttonCreateItem, contentTextArea, listOfTask) {
    _classCallCheck(this, Todo);

    this.buttonCreateItem = document.querySelector(buttonCreateItem);
    this.contentTextArea = document.querySelector(contentTextArea);
    this.listOfTask = document.querySelector(listOfTask);
    this.buttonCreateItem.addEventListener("click", this.handleClickButton.bind(null, this.contentTextArea, this.listOfTask));
  }

  _createClass(Todo, [{
    key: "handleClickButton",
    value: function handleClickButton(contentTextArea, listOfTask) {
      contentTextArea = contentTextArea.value;
      var task = document.createElement("li");
      task.append(contentTextArea);
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
      listOfTask.append(task);
    }
  }]);

  return Todo;
}();
;// CONCATENATED MODULE: ./src/index.js

new Todo(".TODO-container__button", ".TODO-container__text", ".TODO-container__list");


/******/ })()
;