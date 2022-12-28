import Todo from '../../components/todo/todo';

function renderingComponents() {
  const nodeListWrapperComponents: NodeListOf<Element> = document.querySelectorAll('.js-home-page__component-wrapper');
  const arrayWrapperComponents: Element[] = Array.from(nodeListWrapperComponents);

  arrayWrapperComponents.map((a: Element) => new Todo(a));
}

renderingComponents();
