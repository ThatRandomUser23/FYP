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
    const targetBox = event.target.closest('.box');

    if (targetBox) {
        targetBox.appendChild(draggedElement);
        combineContents(targetBox);
    }
}

function combineContents(box) {
    const content1 = box.querySelector('.content1');
    const content2 = box.querySelector('.content2');

    if (content1 && content2) {
        // Remove the original contents
        content1.remove();
        content2.remove();

        // Create the new combined content
        const newContent = document.createElement('div');
        newContent.classList.add('content', 'food1');
        newContent.textContent = 'Food 1';
        newContent.draggable = true;
        newContent.ondragstart = drag;

        // Append the new content to the box
        box.appendChild(newContent);
    }
}

// Touch event handlers
function touchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const target = touch.target;
    if (target.classList.contains('content')) {
        target.classList.add('dragging');
        target.style.position = 'absolute';
        target.style.zIndex = '1000';
        document.body.append(target);
        moveAt(touch.pageX, touch.pageY, target);
    }
}

function touchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const target = document.querySelector('.dragging');
    if (target) {
        moveAt(touch.pageX, touch.pageY, target);
    }
}

function touchEnd(event) {
    event.preventDefault();
    const target = document.querySelector('.dragging');
    if (target) {
        target.classList.remove('dragging');
        target.style.position = '';
        target.style.zIndex = '';
        const dropTarget = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).closest('.box');
        if (dropTarget) {
            dropTarget.appendChild(target);
            combineContents(dropTarget);
        } else {
            const originalBox = document.getElementById(target.id).parentElement;
            originalBox.appendChild(target);
        }
    }
}

function moveAt(pageX, pageY, element) {
    element.style.left = pageX - element.offsetWidth / 2 + 'px';
    element.style.top = pageY - element.offsetHeight / 2 + 'px';
}

document.addEventListener('touchstart', touchStart, { passive: false });
document.addEventListener('touchmove', touchMove, { passive: false });
document.addEventListener('touchend', touchEnd, { passive: false });