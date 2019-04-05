var stackedCard = document.getElementsByClassName("stackedcards-container")[0];

const createCard = (content,src) => {
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardImage = document.createElement("div");
    const img = new Image();
    const cardText = document.createElement("div");
    const cardTextSource = document.createElement("div");
    const cardTextHead = document.createElement("div");
    const cardTextDate = document.createElement("div");
    const cardTextContent = document.createElement("div");
    const cardFooter = document.createElement("div");
    const popularDestinationsText = document.createElement("div");
    const popularDestinationsImage = document.createElement("div");
    const circle = document.createElement("div");
    const advImg = new Image();
    const wrapDiv = document.createElement("div");
    const newsLink = document.createElement("a");

    card.classList.add("card");
    cardContent.classList.add("card-content");
    cardImage.classList.add("card-image");
    cardText.classList.add("card-text");
    cardTextSource.classList.add("card-text-content");
    cardTextHead.classList.add("card-text-head");
    cardTextDate.classList.add("card-text-content");
    cardTextContent.classList.add("card-text-content");
    cardFooter.classList.add("card-footer");
    popularDestinationsText.classList.add("popular-destinations-text");
    popularDestinationsImage.classList.add("popular-destinations-image");
    circle.classList.add("circle");

    newsLink.href = content[0];
    newsLink.textContent = content[1];
    advImg.src = "https://image.ibb.co/jmEYL7/adventure_1.jpg";
    cardTextHead.appendChild(newsLink);
    cardTextSource.textContent = "Source : " + src.toUpperCase();
    cardTextDate.textContent = content[2];
    cardTextContent.textContent = content[4];
    popularDestinationsText.textContent = "Advertismenets here!";
    img.src = content[3];

    circle.appendChild(advImg);
    popularDestinationsImage.appendChild(circle);
    cardFooter.appendChild(popularDestinationsText);
    cardFooter.appendChild(popularDestinationsImage);

    wrapDiv.append(cardTextSource);
    wrapDiv.appendChild(cardTextHead);
    wrapDiv.appendChild(cardTextDate);

    cardText.appendChild(wrapDiv);
    cardText.appendChild(cardTextContent);

    cardImage.appendChild(img);

    cardContent.appendChild(cardImage);
    cardContent.appendChild(cardText);
    cardContent.appendChild(cardFooter);

    card.appendChild(cardContent);

    stackedCard.appendChild(card);
}
// JavaScript Document
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

    // console.log(listElNodesObj);

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
        // console.log(maxElements);
        if (currentPosition < maxElements - 1) {
            currentPosition = currentPosition + 1;
        }
        // console.log(currentPosition);
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
            // console.log(translateY, translateX, currentPosition)
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

// =================================================

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvuB5BfFnsnUJqgPtrLUyMxLtASNrwKSU",
    authDomain: "digizen-a55ed.firebaseapp.com",
    databaseURL: "https://digizen-a55ed.firebaseio.com",
    projectId: "digizen-a55ed",
    storageBucket: "digizen-a55ed.appspot.com",
    messagingSenderId: "70160889115"
};
firebase.initializeApp(config);

var database = firebase.database();

async function get_data(sources) {
    var articles = [];
    for (var i = 0; i < sources.length; i++) {
        var snapshot = await firebase.database().ref(sources[i] + "/").once('value');
        articles.push([snapshot.val(),sources[i]]);
    }
    console.log(articles)
    return articles;
}


console.log(JSON.parse(window.localStorage.getItem("links")));

var get_result = async function () {
    var result = await get_data(JSON.parse(window.localStorage.getItem("links")))
    result.forEach((res) => {
        const src = res[1];
        res = res[0];
        res = res.splice(1);
        res.forEach((fin) => {
            // console.log(fin);
            createCard(fin,src);
        })
    })
    var stackedCard = document.getElementsByClassName("stackedcards-container")[0];

    for (var i = stackedCard.children.length; i >= 0; i--) {
        stackedCard.appendChild(stackedCard.children[Math.random() * i | 0]);
    }

    stackedCards();
};


get_result();

