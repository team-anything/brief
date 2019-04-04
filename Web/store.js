if (window.localStorage.getItem("links") == null) {
    window.localStorage.setItem("links", JSON.stringify(new Array()));
}

// FUNCTION ==============================================================
const createLnkElem = (lnkAdr) => {
    const lnkElem = document.createElement("li");
    const remElem = document.createElement("div")
    const temp = document.createElement("div");

    lnkElem.classList.add("link");
    remElem.classList.add("remSub");
    lnkElem.id = "link" + lnkAdr;
    remElem.id = lnkAdr;


    temp.textContent = lnkAdr;
    remElem.textContent = "⊗";

    lnkElem.appendChild(temp);
    lnkElem.appendChild(remElem);

    sideBarMen.appendChild(lnkElem);

    remElem.addEventListener("click", (e) => {
        remLnk(lnkElem);
    })
}

const remLnk = (lnkElem) => {
    const links = JSON.parse(window.localStorage.getItem("links"));
    const lnkAdr = lnkElem.firstChild.textContent;
    const newLnk = links.filter(e => e !== lnkAdr);

    lnkElem.remove();
    window.localStorage.setItem("links", JSON.stringify(newLnk));
}

// ========================================================================


const links = (JSON.parse(window.localStorage.getItem("links")));
console.log(typeof (links), links);
const sideBarMen = document.getElementsByClassName("sidebarMenuInner")[0];
const addElem = document.getElementsByClassName("addSub")[0];
const subLnk = document.getElementsByClassName("subLnk")[0];
links.forEach((e) => { createLnkElem(e) });

addElem.addEventListener("click", (e) => {
    const links = JSON.parse(window.localStorage.getItem("links"));
    if (links.indexOf(subLnk.value) == -1) {
        links.push(subLnk.value);
        createLnkElem(subLnk.value);
        window.localStorage.setItem("links", JSON.stringify(links));
    }
    subLnk.value = "";
});

// register service worker

window.addEventListener('load', async e => {
    console.log(navigator.onLine);
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
});