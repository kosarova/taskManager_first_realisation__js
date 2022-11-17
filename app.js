// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

//Elements UI 
const listContainer = document.querySelector(
  '.tasks-list-section .list-group',
);
const form = document.forms['addTask'];
const inputBody = form.elements['body'];
const inputTitle = form.elements['title']

renderAllTasks(objOfTasks);
form.addEventListener ('submit', formSubmitHandler);
listContainer.addEventListener('click', onDeleteHandler)

function renderAllTasks(tasksList) {
  if (!tasksList) {
    console.error('C`mon enter tasklist')
    return 
  };

  const fragment = document.createDocumentFragment();
  Object.values(tasksList).forEach((task) => {
    const li = listItemTemplate(task)
    fragment.appendChild(li)
  })
  listContainer.appendChild(fragment);
};

function listItemTemplate ({ _id, body, title} = {}) {
    //Create Element
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute('data-task-id', _id);
    
    const article = document.createElement('p');
    article.classList.add('mt-2', 'w-100');
    article.textContent = body;

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    deleteButton.textContent = "Delete";

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(article);

    return li
}

function formSubmitHandler (e) {
    e.preventDefault();
    const bodyValue = inputBody.value;
    const titleValue = inputTitle.value;
    
    if (!bodyValue || !titleValue) {
      alert('Enter Title task and task body, thx')
      return;
    }

    const task = createNewTask(titleValue, bodyValue)
    const listElement = listItemTemplate(task)
    listContainer.insertAdjacentElement("afterbegin", listElement)
    form.reset();
}

function createNewTask (title, body) {
  const newTask = {
    title,
    body,
    _id: `task-${Math.random()}`,
    completed: false
  }
  objOfTasks[newTask._id] = newTask
  return { ...newTask }
}

function deleteTask (id) {
  const isConfirm = confirm('Are you sure? You want delete this?')
  if (!isConfirm) return isConfirm;
  delete objOfTasks[id];
  return isConfirm;
}

function deleteTaskFromHTML (confirmed, el) {
    if (!confirmed) return;
    el.remove();
}

function onDeleteHandler ( {target} ) {
  if (target.classList.contains('delete-btn')) {
    const parents = target.closest('[data-task-id]')
    const id = parents.dataset.taskId;
    const confirmed = deleteTask(id);
    deleteTaskFromHTML(confirmed, parents);
  }
}

})(tasks)