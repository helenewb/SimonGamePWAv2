(function () {
    'use strict';
    
    //register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .catch(console.error);
    }
    
    // setup seqList (sequence playlist with buttons flashing in order - to check, to animate)
    var seq = [Math.floor(Math.random()*4)]; //initializes first sequence with random button
    var seqList = [seq]; //playlist consisting of seq-Arrays
    var levelIdx = 0; //level-Counter
    var selectedLevel = []; //array from seqList at given level

    setLevel(0);


    // initialize buttons
    var selectedIdx = -1;
    var tmr = null;
    var items = document.querySelectorAll('.btnClick'); //get all 4 buttons in items-array
    console.log('items', items.length);

    //  wire up buttons
    var watchInput = false;
    items.forEach(function (item) {
        item.addEventListener('click', function () {
            if (watchInput) {
                flashItem(item);
                var clickedItem = parseInt(item.id.split('-')[1], 10);
                console.log(clickedItem);
                var expectedItem = selectedLevel[selectedIdx];
                // check input
                if (clickedItem === expectedItem) {
                    console.log('CORRECT');
                } else {
                    console.log('INCORRECT pressed ' + clickedItem + ' expected ' + expectedItem);
                    document.getElementById('incorrect').style.display = 'block';
                }
                selectedIdx++;
                if (selectedIdx === selectedLevel.length) {
                    watchInput = false;
                    setLevel(levelIdx + 1);
                    document.getElementById('correct').style.display = 'block';
                }
            }
        });
    });

    document.getElementById('startGame').addEventListener('click', function () {
        console.log('click start');
        start();
    });

    document.getElementById('resetBtn').addEventListener('click', function () {
        console.log('reset button clicked');
        reset();
    });

    function reset() {
        seq = [Math.floor(Math.random()*4)];
        seqList = [seq];
        levelIdx = 0;
        selectedLevel = [];
        setLevel(0);
    }

    function flashItem(item) {
        addClass(item, 'flash');
        setTimeout(function () {
            removeClass(item, 'flash');
        }, 150);
    }

    //LEVEL - which is shown/counter
    function setLevel(level) {
        console.log(level);
        var arr = [];
        if(level == 0) {
            console.log("arr = " +arr[0]);
        }
        else{
            arr = seqList[level -1];
            arr.push(Math.floor(Math.random()*4));
            seqList.push(arr);
            console.log("further down: "+seqList[level]);
        }
       
        
        levelIdx = level;
        selectedLevel = seqList[levelIdx];
        document.getElementById('level').innerHTML = levelIdx;
    }

    function start() {
        cancelNextItem();
        selectedIdx = -1;
        setVisibility('correct', false);
        setVisibility('incorrect', false);
        nextItem();
    }

    function setVisibility(id, visible) {
        document.getElementById(id).style.display = visible ? 'block' : 'none';
        //console.log(id);
    }

    function addClass(elem, cls) {
        if (typeof elem === 'string') {
            //console.log('addClass elem === string', elem);
            elem = document.getElementById(elem);
        }
        var i;
        var found = false;
        //console.log('addClass elem', elem);
        var classes = elem.className.split(' ');
        //console.log(classes);
        for (i = 0; i < classes.length; i++) {
            if (classes[i] === cls) {
                found = true;
            }
        }
        if (!found) {
            elem.className += ' ' + cls;
            //console.log(elem.className);
        }
    }

    function removeClass(elem, remove) {
        if (typeof elem === 'string') {
            elem = document.getElementById(elem);
        }
        var newClassName = '';
        var i;
        var classes = elem.className.split(' ');
        for (i = 0; i < classes.length; i++) {
            if (classes[i] !== remove) {
                newClassName += classes[i] + ' ';
            }
        }
        elem.className = newClassName;
    }

    // button functions
    function cancelNextItem() {
        if (tmr) {
            window.cancelTimeout(tmr);
        }
    }

    function clearItems() {
        items.forEach(function (item) {
            removeClass(item, 'flash');
        });
    }

    function setItem(selectedIdx) {
        addClass(items[selectedIdx], 'flash');
    }

    function nextItem() {
        tmr = null;
        var currentIdx = -1;
        selectedIdx++;
        if (selectedIdx < selectedLevel.length) {
            // not finished pattern yet
            currentIdx = selectedLevel[selectedIdx];
        }
        // clear current
        if (selectedIdx > 0) {
            clearItems();
        }
        // set next

        if (selectedIdx > 0 && currentIdx > -1) {
            // was previous and next
            // allow a pause before next flash
            window.setTimeout(function () {
                postNext(currentIdx);
            }, 150);
        } else {
            // no previous flash so just set next
            postNext(currentIdx);
        }
    }

    function postNext(currentIdx) {
        if (currentIdx > -1) {
            setItem(currentIdx);
            tmr = window.setTimeout(nextItem, 800);
        } else {
            startWatching();
        }
    }

    function startWatching() {
        selectedIdx = 0;
        watchInput = true;
    }
})();