const draggables = document.querySelectorAll('.draggable');
const container = document.querySelector('.container');
const taskDescription = document.getElementById('task-description');
const restartBtn = document.getElementById('restart-btn');
const btnHolder = document.querySelector('.btnHolder') 

let step = 0;

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

container.addEventListener('dragover', e => {
    e.preventDefault();
});

container.addEventListener('drop', e => {
    e.preventDefault();
    const draggedElement = document.querySelector('.dragging');
    if (!draggedElement) return;

    const draggedId = draggedElement.id;

    if (step === 0 && draggedId === 'bottle-without-cap') {
        container.innerHTML = '<img class="conveyor-img" src="icon-pack/third-game-pics/conveyor_belt.png" alt="Futószalag"><img class="bottle-on-belt" src="icon-pack/third-game-pics/bottle-without cap.png" alt="Üres palack">';
        draggedElement.style.display = 'none';
        step = 1;
    } else if (step === 1 && draggedId === 'cap') {
        container.innerHTML = '<img class="conveyor-img" src="icon-pack/third-game-pics/conveyor_belt.png" alt="Futószalag"><img class="bottle-on-belt" src="icon-pack/third-game-pics/cap-bottle.png" alt="Palack kupakkal">';
        draggedElement.style.display = 'none';
        step = 2;
    } else if (step === 2 && draggedId === 'tag') {
        container.innerHTML = '<img class="conveyor-img" src="icon-pack/third-game-pics/conveyor_belt.png" alt="Futószalag"><img class="bottle-on-belt" src="icon-pack/third-game-pics/full-bottle.png" alt="Teljes palack">';
        draggedElement.style.display = 'none';
        step = 3;
        taskDescription.textContent = 'Gratulálunk, a borod palackba került!';
        btnHolder.innerHTML += `<a href="http://" class="btn-style-4 btn-effect" ></a>`
    }
});

restartBtn.addEventListener('click', () => {
    step = 0;
    container.innerHTML = '<img class="conveyor-img" src="icon-pack/third-game-pics/conveyor_belt.png" alt="Futószalag">';
    taskDescription.textContent = 'Húzd fel a palackot, majd a kupakot és a címkét a futószalagra!';
    document.getElementById('bottle-without-cap').style.display = 'inline-block';
    document.getElementById('cap').style.display = 'inline-block';
    document.getElementById('tag').style.display = 'inline-block';
});
