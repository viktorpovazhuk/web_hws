/* YOUR CODE HERE! */

const colors = ['red', 'blue', 'green', 'purple', 'grey'];

let boxNumber = 2;

function addBoxEventsListeners(newBox) {
    function onMouseMove(ev) {
        console.log(ev.type, ev.target);
        ev.target.style.left = ev.pageX - ev.target.offsetWidth / 2 + 'px';
        ev.target.style.top = ev.pageY - ev.target.offsetHeight / 2 + 'px';
    }

    newBox.addEventListener('mousedown', (ev) => {
        console.log(ev.type, ev.button);
        if (ev.button === 0) {
            newBox.addEventListener('mousemove', onMouseMove);
        }
    });

    newBox.addEventListener('mouseup', (ev) => {
        console.log(ev.type);
        if (ev.button === 0) {
            newBox.removeEventListener('mousemove', onMouseMove);
        }
    });

    newBox.addEventListener('mousedown', (ev) => {
        console.log(ev.type, ev.button);
        if (ev.button === 2) {
            newBox.style['background-color'] = colors[Math.floor(Math.random() * 5)];
        }
    });

    newBox.addEventListener('mousedown', (ev) => {
        console.log(ev.type, ev.button);
        if (ev.button === 2) {
            newBox.style['background-color'] = colors[Math.floor(Math.random() * 5)];
        }
    });

    newBox.addEventListener('mousedown', (ev) => {
        console.log(ev.type, ev.button);
        if (ev.button === 0 && ev.shiftKey) {
            newBox.classList.toggle('box-large');
        }
    });

    newBox.addEventListener('dblclick', (ev) => {
        console.log(ev.type, ev.button);
        if (ev.button === 0 && ev.altKey) {
            let boxesNum = document.getElementsByClassName('box').length;
            if (boxesNum > 1) {
                ev.target.remove();
            }
        }
    });

    newBox.addEventListener('dblclick', (ev) => {
        console.log(ev.type, ev.button);
        if (ev.button === 0) {
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