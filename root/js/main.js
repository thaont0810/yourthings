let todo = [{
  name: 'task1',
  place: 'place1',
  type: 'business',
  isDone: true
}, {
  name: 'task2',
  place: 'place2',
  type: 'personal',
  isDone: false
}, {
  name: 'task3',
  place: 'place3',
  type: 'business',
  isDone: false
}];
let ul = document.getElementById('list');

function load() {
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify(todo));
  }

  let innerList = '';

  for (let i = 0; i < todo.length; i++) {
    innerList += `<li class="item">
                <div class="item__illus">
                  <div class="item__type"> ${todo[i].type} </div>
                </div>
                <div class="item__content">
                  <h3 class="item__name"> ${todo[i].name} </h3>
                  <p class="item__place"> ${todo[i].place} </p>
                </div>
              </li>`;
    ul.innerHTML = innerList;
  }
}

let plus = document.getElementById('plus');
let modal = document.getElementById('overlay-modal');
let back = document.getElementById('back');
plus.addEventListener('click', function () {
  modal.classList.add("show-modal");
});
back.addEventListener('click', function () {
  modal.classList.remove('show-modal');
});
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');

function addTask() {
  if (input1.value && input2.value) {
    todo.push();
  }
}

load();