function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const targetBox = event.target;

    if (targetBox.classList.contains('box') && !targetBox.querySelector('.content')) {
        targetBox.appendChild(draggedElement);
    } else if (targetBox.classList.contains('content')) {
        const parentBox = targetBox.parentElement;
        parentBox.appendChild(draggedElement);
        targetBox.parentElement.appendChild(targetBox);
    }
}