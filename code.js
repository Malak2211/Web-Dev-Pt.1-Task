function addTask() {
    let taskInput = document.getElementById('taskInput');
    let inputtask = taskInput.value.trim();
    
    if (inputtask === '') {
        alert('Please enter a task.');
        return;
    }
    
    let pendingTasks = document.getElementById('pendingTasks');
    let newTask = createElementt(inputtask);
    
    pendingTasks.appendChild(newTask);
    taskInput.value = '';
    saveTasks();
}

function createElementt(input) {
    let li = document.createElement('li');
    li.textContent = input;
    li.style.width = '300px'; 
    li.style.backgroundColor = '#FFD1DC';  
    li.style.position = 'relative';
    li.style.marginLeft = '20%';

    let completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = () => mark(li);
    completeButton.style.position = 'absolute';
    completeButton.style.bottom = '10px';
    completeButton.style.right = '20px';

    li.appendChild(completeButton);

    return li;
}

function mark(Elementt) {
    Elementt.classList.add('completed');
    Elementt.style.textDecoration = 'line-through'; 
    Elementt.style.color = 'blue'; 
    Elementt.style.backgroundColor = '#e0e0e0';
    Elementt.querySelector('button').remove();

    let completedTasks = document.getElementById('completedTasks');
    completedTasks.appendChild(Elementt);

    saveTasks();
}

function saveTasks() {
    let pendingTasks = [];
    document.querySelectorAll('#pendingTasks li').forEach(task => {
        pendingTasks.push(task.textContent.replace('Complete', '').trim());
    });

    let completedTasks = [];
    document.querySelectorAll('#completedTasks li').forEach(task => {
        completedTasks.push(task.textContent.trim());
    });

    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadTasks() {
    let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks') || '[]');
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    pendingTasks.forEach(task => {
        let Elementt = createElementt(task);
        document.getElementById('pendingTasks').appendChild(Elementt);
    });
    completedTasks.forEach(task => {
        let Elementt = createElementt(task);
        Elementt.classList.add('completed');
        Elementt.style.textDecoration = 'line-through';
        Elementt.style.color = 'blue'; 
        Elementt.style.backgroundColor = '#FFD1DC'; 
        Elementt.querySelector('button').remove(); 
        document.getElementById('completedTasks').appendChild(Elementt);
    });
}
function deleteall() { 
    document.getElementById('pendingTasks').innerHTML = '';
    document.getElementById('completedTasks').innerHTML = '';
    localStorage.removeItem('pendingTasks');
    localStorage.removeItem('completedTasks');
}

window.onload = loadTasks;
