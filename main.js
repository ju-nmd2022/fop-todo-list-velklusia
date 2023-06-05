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
    
     function addTaskToList(task) {
        const task_div = document.createElement("div");
        task_div.classList.add("task");
        list.appendChild(task_div);

        const task_content_div = document.createElement("div");
        task_content_div.classList.add("content");
        task_div.appendChild(task_content_div);

        const task_input= document.createElement("input");
        task_input.classList.add("text");
        task_input.type = "text";
        task_input.value= task;
        task_input.setAttribute("readonly", "readonly");
        task_content_div.appendChild(task_input);

        const task_actions_div= document.createElement("div");
        task_actions_div.classList.add("actions");
        task_div.appendChild(task_actions_div);

        const task_edit_botton= document.createElement("button");
        task_edit_botton.classList.add("Edit");
        task_edit_botton.innerHTML = "Edit";

        const task_delete_button= document.createElement("button");
        task_delete_button.classList.add("Delete");
        task_delete_button.innerHTML = "Delete 🗑️";

        const task_completed_button= document.createElement("button");
        task_completed_button.classList.add("Completed");
        task_completed_button.innerHTML = "Completed ✅";

        task_actions_div.appendChild(task_edit_botton);
        task_actions_div.appendChild(task_completed_button);
        task_actions_div.appendChild(task_delete_button);

        task_edit_botton.addEventListener('click', ()=>{
            if (task_edit_botton.innerText.toLowerCase() =="edit") {
                task_input.removeAttribute("readonly");
                task_input.focus();
                task_edit_botton.innerText = "Save";
                task_input.style.textDecoration="none"
            } else {
                task_input.setAttribute("readonly", "readonly");
                task_edit_botton.innerText ="Edit";
                tasks[tasks.indexOf(task)] = task_input.value;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        task_delete_button.addEventListener('click', ()=>{
            if (confirm("Are you sure you want to delete this task?")) {
                list.removeChild(task_div);
                tasks.splice(tasks.indexOf(task), 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        })
  task_completed_button.addEventListener('click', ()=>{
    task_input.style.textDecoration = 'line-through';
    tasks[tasks.indexOf(task)] = task_input.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
})
    }
});
