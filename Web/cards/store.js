if (window.localStorage.getItem("count") == null) {
    window.localStorage.setItem("count", JSON.stringify(0));
    var linkCount = 0;
} else {
    var linkCount = JSON.parse(window.localStorage.getItem("count"));
    const links = [];
    for (let i = 0; i < linkCount; i++) {
        links.push(JSON.parse(window.localStorage.getItem(JSON.stringify(i))));
    }
}

const addSub = document.getElementsByClassName("addSub")[0];
const subLnk = document.getElementsByClassName("subLnk")[0];

addSub.addEventListener("click", (e) => {
    const link = subLnk.value;
    window.localStorage.setItem(JSON.stringify(linkCount), JSON.stringify(link));
    linkCount += 1;
    window.localStorage.setItem("count", JSON.stringify(linkCount));
    subLnk.value = "";
}