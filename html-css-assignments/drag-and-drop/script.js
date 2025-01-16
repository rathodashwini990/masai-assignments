const list = document.getElementById('list');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
  if (e.target && e.target.nodeName === 'LI') {
    draggedItem = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }
});

list.addEventListener('dragend', (e) => {
  if (draggedItem) {
    e.target.classList.remove('dragging');
    draggedItem = null;
  }
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target;

  if (target && target.nodeName === 'LI' && target !== draggedItem) {
    const bounding = target.getBoundingClientRect();
    const offset = e.clientY - bounding.top;
    const middle = bounding.height / 2;

    if (offset > middle) {
      target.parentNode.insertBefore(draggedItem, target.nextSibling);
    } else {
      target.parentNode.insertBefore(draggedItem, target);
    }
  }
});