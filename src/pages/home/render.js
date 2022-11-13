import Todo from '../../components/todo/todo.js';

const nodeListOfWrapperComponents= document.querySelectorAll('.home-page__component-wrapper');
const arrayOfWrapperComponents= Array.from(nodeListOfWrapperComponents);
const arrayOfClassInstances= arrayOfWrapperComponents.map(function(a){return new Todo(a);});

export default arrayOfClassInstances;