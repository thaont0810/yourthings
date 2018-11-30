let todo = [{
    name: 'Do tasks at office',
    place: 'office',
    type: 'business',
    isDone: true
  },
  {
    name: 'go to market',
    place: 'market',
    type: 'personal',
    isDone: false
  },
  {
    name: 'meet customers',
    place: 'cafe house',
    type: 'business',
    isDone: false
  },
  {
    name: 'walk a dog',
    place: 'park',
    type: 'business',
    isDone: false
  }
]

let ulInbox = document.getElementById('list1');
let ulCompleted = document.getElementById('list2');

function load() {
  let business = 0;
  let personal = 0;
  let done = 0;
  let notDone = 0;

  let data = localStorage.getItem('todo');
  if (!data) {
    localStorage.setItem('todo', JSON.stringify(todo));
  }
  todo = JSON.parse(data);

  let innerListCompleted = '';
  let innerListInbox = '';
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].isDone) {
      innerListCompleted += `<li class="item">
                              <div class="item__illus">
                                <div class="item__type"> ${todo[i].type} </div>
                              </div>
                              <div class="item__content">
                              <label class="item__name" onclick="turnCompleted( ${i})">
                                <input type="checkbox" checked name="${todo[i].name}" id="">${todo[i].name}
                              </label>
                                <p class="item__place"> ${todo[i].place} </p>
                              </div>
                              <div class="method">
                                <span class="method__edit" onclick="editTask(${i})">
                                  <img src="images/edit.png" alt="">
                                </span>
                                <span class="method__del" onclick="delTask(${i})">
                                  <img src="images/del.png" alt="">
                                </span>
                              </div>
                            </li>`;
    } else {
      innerListInbox += `<li class="item">
                          <div class="item__illus">
                            <div class="item__type"> ${todo[i].type} </div>
                          </div>
                          <div class="item__content">
                            <label class="item__name" onclick="turnCompleted( ${i})">
                              <input type="checkbox" name="${todo[i].name}" id="">${todo[i].name}
                            </label>
                            <p class="item__place"> ${todo[i].place} </p>
                          </div>
                          <div class="method">
                            <span class="method__edit" onclick="editTask(${i})">
                              <img src="images/edit.png" alt="">
                            </span>
                            <span class="method__del" onclick="delTask(${i})">
                              <img src="images/del.png" alt="">
                            </span>
                          </div>
                        </li>`;
    }

    if (todo[i].type === 'business') {
      business += 1;
    } else {
      personal += 1;
    }

    if (todo[i].isDone) {
      done += 1;
    } else {
      notDone += 1;
    }

  }

  ulInbox.innerHTML = innerListInbox;
  ulCompleted.innerHTML = innerListCompleted;

  let numPer = document.getElementById('count__per');
  numPer.innerHTML = `<p> ${personal} personal</p>`;

  let numBus = document.getElementById('count__bus');
  numBus.innerHTML = `<p> ${business} business</p>`;

  let numDoneCollection = document.getElementsByClassName('num-done');
  for (let i = 0; i < numDoneCollection.length; i++) {
    numDoneCollection[i].innerHTML = `${done}`;
  }

  let numNotDoneCollection = document.getElementsByClassName('num-notdone');
  for (let i = 0; i < numNotDoneCollection.length; i++) {
    numNotDoneCollection[i].innerHTML = `${notDone}`;
  }

  let donePercent = document.getElementById('count__done');
  donePercent.innerHTML = `${(done * 100/ (personal + business)).toFixed(2)} % done`;

}

let plus = document.getElementById('plus');
let modal = document.getElementById('overlay-modal');
let back = document.getElementById('back');

plus.addEventListener('click', function () {
  modal.classList.add("show-modal");
});

back.addEventListener('click', function () {
  modal.classList.remove('show-modal');
})

let name = document.getElementById('task-name');
let place = document.getElementById('task-place');
let type = document.getElementById('select-type');
let error_name = document.getElementById('error-name');
let error_place = document.getElementById('error-place');
let errorName = false;
let errorPlace = false;

function validateName() {
  if (name.value.length <= 0) {
    error_name.innerHTML = "Required";
    errorName = true;
  } else {
    errorName = false;
    error_name.innerHTML = "";
  }
}

function validatePlace() {
  if (place.value.length <= 0) {
    error_place.innerHTML = "Required";
    errorPlace = true;
  } else {
    errorPlace = false;
    error_place.innerHTML = "";
  }
}

function addTask() {
  validateName();
  validatePlace();

  if (errorName === false && errorPlace === false) {
    let newTask = {
      name: name.value,
      place: place.value,
      type: type.value,
      isDone: false
    };

    todo.unshift(newTask);
    localStorage.setItem('todo', JSON.stringify(todo));
    modal.classList.remove('show-modal');

    name.value = '';
    place.value = '';
  }

  load();
}

function delName() {
  name.value = '';
}

function delPlace() {
  place.value = '';
}

function delTask(i) {
  todo.splice(i, 1);
  localStorage.setItem('todo', JSON.stringify(todo));
  load();
}

// function editTask(i) {
//   let editTask = todo[i];
//   name.value = editTask.name;
//   place.value = editTask.place;
//   type.value = editTask.type;
// }

function turnCompleted(i) {
  if (todo[i].isDone === true) {
    todo[i].isDone = false;
  } else {
    todo[i].isDone = true;
  }
  localStorage.setItem('todo', JSON.stringify(todo));
  load();
}

let content = document.getElementById('content');
let inboxSection = document.getElementById('inbox');
let completedSection = document.getElementById('completed');

function reverse() {
  content.classList.toggle('active');
}


load();