/* YOUR CODE HERE! */

const colors = ['red', 'blue', 'green', 'purple', 'grey'];

let boxNumber = 2;

let leftMouseDown = false;

function addBoxEventsListeners(newBox) {
    function onMouseMove(ev) {
        if (leftMouseDown) {
            ev.target.style.left = ev.pageX - ev.target.offsetWidth / 2 + 'px';
            ev.target.style.top = ev.pageY - ev.target.offsetHeight / 2 + 'px';
        }
    }

    newBox.addEventListener('mousemove', onMouseMove);

    newBox.addEventListener('mousedown', (ev) => {
        if (ev.button === 0 && !ev.shiftKey) {
            leftMouseDown = true;
        }
    });

    newBox.addEventListener('mouseup', (ev) => {
        if (ev.button === 0 && !ev.shiftKey) {
            leftMouseDown = false;
        }
    });

    newBox.addEventListener('mousedown', (ev) => {
        if (ev.button === 2) {
            newBox.style['background-color'] = colors[Math.floor(Math.random() * 5)];
        }
    });

    newBox.addEventListener('mousedown', (ev) => {
        if (ev.button === 2) {
            newBox.style['background-color'] = colors[Math.floor(Math.random() * 5)];
        }
    });

    newBox.addEventListener('mousedown', (ev) => {
        if (ev.button === 0 && ev.shiftKey) {
            newBox.classList.toggle('box-large');
        }
    });

    newBox.addEventListener('dblclick', (ev) => {
        if (ev.button === 0 && ev.altKey) {
            let boxesNum = document.getElementsByClassName('box').length;
            if (boxesNum > 1) {
                ev.target.remove();
            }
        }
    });

    newBox.addEventListener('dblclick', (ev) => {
        if (ev.button === 0 && !ev.altKey) {
            let boxContainer = document.getElementsByClassName('box-container')[0];

            let newBox = document.createElement('div');
            let boxText = document.createTextNode(boxNumber);

            newBox.classList.add('box');
            addBoxEventsListeners(newBox);

            newBox.appendChild(boxText);
            boxContainer.appendChild(newBox);

            boxNumber += 1;
        }
    });
}

let initBox = document.getElementsByClassName('box')[0];

addBoxEventsListeners(initBox);