// JavaScript Document
document.addEventListener("DOMContentLoaded", function (event) {

    function stackedCards() {

        var items = 3; //Number of visible elements when the stacked options are bottom or top.
        var elementsMargin = 0; //Define the distance of each element when the stacked options are bottom or top.
        var maxElements; //Total of stacked cards on DOM.
        var currentPosition = 0; //Keep the position of active stacked card.
        var listElNodesObj; //Keep the list of nodes from stacked cards.
        var currentElementObj; //Keep the stacked card element to swipe.
        var stackedCardsObj;
        var obj;
        var elTrans;

        obj = document.getElementById('stacked-cards-block');
        stackedCardsObj = obj.querySelector('.stackedcards-container');
        listElNodesObj = stackedCardsObj.children;

        countElements();
        currentElement();
        listElNodesWidth = stackedCardsObj.offsetWidth;
        currentElementObj = listElNodesObj[0];
        updateUi();

        //Prepare elements on DOM
        addMargin = elementsMargin * (items - 1) + 'px';

        for (i = items; i < maxElements; i++) {
            listElNodesObj[i].style.zIndex = 0;
            listElNodesObj[i].style.opacity = 0;
            listElNodesObj[i].style.webkitTransform = 'scale(' + (1 - (items * 0.04)) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
            listElNodesObj[i].style.transform = 'scale(' + (1 - (items * 0.04)) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
        }

        if (listElNodesObj[currentPosition]) {
            listElNodesObj[currentPosition].classList.add('stackedcards-active');
        }

        //Remove class init
        setTimeout(function () {
            obj.classList.remove('init');
        }, 150);

        // Usable functions
        function countElements() {
            maxElements = listElNodesObj.length;
        };

        //Keep the active card.
        function currentElement() {
            currentElementObj = listElNodesObj[currentPosition];
        };

        //Swipe active card to top.
        function onSwipeTop() {
            removeNoTransition();
            transformUi(0, -1000, 0, currentElementObj);

            if (currentPosition < maxElements - 1) {
                currentPosition = currentPosition + 1;
            }

            updateUi();
            currentElement();
            setActiveHidden("u");
        };

        function onSwipeBottom() {
            removeNoTransition();
            if (currentPosition > 0) {
                currentPosition = currentPosition - 1;
            }
            transformUi(0, 1000, 0, currentElementObj);

            updateUi();
            currentElement();
            setActiveHidden("d");
        };

        //Remove transitions from all elements to be moved in each swipe movement to improve perfomance of stacked cards.
        function removeNoTransition() {
            if (listElNodesObj[currentPosition]) {
                listElNodesObj[currentPosition].classList.remove('no-transition');
                listElNodesObj[currentPosition].style.zIndex = 6;
            }

        };

        function setActiveHidden(loc) {
            if (loc == "u") {
                if (!(currentPosition >= maxElements)) {
                    listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
                    listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
                    listElNodesObj[currentPosition].classList.remove('stackedcards-active');
                    listElNodesObj[currentPosition].classList.add('stackedcards-active');
                }
            }
            else if (loc == "d") {
                if (!(currentPosition == 0)) {
                    listElNodesObj[currentPosition + 1].classList.remove('stackedcards-active');
                    listElNodesObj[currentPosition + 1].classList.add('stackedcards-hidden');
                    listElNodesObj[currentPosition].classList.remove('stackedcards-active');
                    listElNodesObj[currentPosition].classList.add('stackedcards-active');
                }
            }

        };

        //Set the new z-index for specific card.
        function setZindex(zIndex) {
            if (listElNodesObj[currentPosition]) {
                listElNodesObj[currentPosition].style.zIndex = zIndex;
            }
        };
        
        //Add translate X and Y to active card for each frame.
        function transformUi(moveX, moveY, opacity, elementObj) {
            requestAnimationFrame(function () {
                var element = elementObj;

                    elTrans = elementsMargin * (items - 1);
                    if (element) {
                        element.style.webkitTransform = "translateY(" + (moveY + elTrans) + "px)";
                        element.style.transform = "translateY(" + (moveY + elTrans) + "px)";
                        element.style.opacity = opacity;
                    }
            });
        };

        //Action to update all elements on the DOM for each stacked card.
        function updateUi() {
            requestAnimationFrame(function () {
                elTrans = 0;
                var elZindex = 2;
                var elScale = 1;
                var elOpac = 1;
                var elTransTop = items;
                var elTransInc = elementsMargin;

                for (i = currentPosition; i < (currentPosition + items); i++) {
                    if (listElNodesObj[i]) {

                            listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
                            elTrans = elTransInc * elTransTop;
                            elTransTop--;

                        listElNodesObj[i].style.transform = 'scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                        listElNodesObj[i].style.webkitTransform = 'scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                        listElNodesObj[i].style.opacity = elOpac;
                        listElNodesObj[i].style.zIndex = elZindex;

                        elScale = elScale - 0.04;
                        elOpac = elOpac - (1 / items);
                        elZindex--;
                    }
                }

            });

        };

        //Touch events block
        var element = obj;
        var startTime;
        var startX;
        var startY;
        var translateX;
        var translateY;
        var currentX;
        var currentY;
        var touchingElement = false;

        function gestureStart(evt) {
            startTime = new Date().getTime();

            startX = evt.changedTouches[0].clientX;
            startY = evt.changedTouches[0].clientY;

            currentX = startX;
            currentY = startY;

            touchingElement = true;
            if (!(currentPosition >= maxElements)) {
                if (listElNodesObj[currentPosition]) {
                    listElNodesObj[currentPosition].classList.add('no-transition');
                    setZindex(6);

                    if ((currentPosition + 1) < maxElements) {
                        listElNodesObj[currentPosition + 1].style.opacity = '1';
                    }

                    elementHeight = listElNodesObj[currentPosition].offsetHeight / 3;
                }

            }

        };

        function gestureMove(evt) {
            currentX = evt.changedTouches[0].pageX;
            currentY = evt.changedTouches[0].pageY;

            translateX = currentX - startX;
            translateY = currentY - startY;

            if (!(currentPosition >= maxElements)) {
                evt.preventDefault();
                // transformUi(translateX, 0, 1, currentElementObj);

            }

        };

        function gestureEnd(evt) {

            if (!touchingElement) {
                return;
            }

            translateX = currentX - startX;
            translateY = currentY - startY;

            timeTaken = new Date().getTime() - startTime;

            touchingElement = false;

            if (!(currentPosition >= maxElements)) {
                console.log(translateY, translateX, currentPosition)
                if (translateY < -100) {  //is Top?
                    onSwipeTop()
                } else if (translateY > 100) {
                    onSwipeBottom()
                }
            }
        };

        element.addEventListener('touchstart', gestureStart, false);
        element.addEventListener('touchmove', gestureMove, false);
        element.addEventListener('touchend', gestureEnd, false);
    }
    stackedCards();
});