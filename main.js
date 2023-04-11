window.addEventListener('load', ()=>{
    const form= document.querySelector("#task-form");
    const input= document.querySelector("#task-input");
    const list= document.querySelector("#tasks");
    let tasks = [];

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const task = input.value.trim();
        if (!task) {
            return;
        } 
        addTaskToList(task);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = "";
    });
