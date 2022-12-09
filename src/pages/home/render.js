import Todo from '../../components/todo/todo';

function renderingComponents() {
  const nodeListWrapperComponents = document.querySelectorAll('.js-home-page__component-wrapper');
  const arrayWrapperComponents = Array.from(nodeListWrapperComponents);
  const arrayClassInstances = arrayWrapperComponents.map((a) => new Todo(a));
  return arrayClassInstances;
}

const arrayClassInstances = renderingComponents();

export default arrayClassInstances;
