// eslint-disable-next-line import/extensions
import Todo from '../../components/todo/todo.js';

function renderingComponents() {
  const nodeListOfWrapperComponents = document.querySelectorAll('.js-home-page__component-wrapper');
  const arrayOfWrapperComponents = Array.from(nodeListOfWrapperComponents);
  const arrayOfClassInstances = arrayOfWrapperComponents.map((a) => new Todo(a));
  return arrayOfClassInstances;
}

const arrayOfClassInstances = renderingComponents();

export default arrayOfClassInstances;
