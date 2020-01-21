"use strict"

function showComment() {
    const blockComment = document.querySelector(".comments__output");
    const text = getComment();

    setTimeout(() => {
        if (text.length > 0) {
            setComment(text);
            blockComment.innerHTML = comments.join("");
        }
    }, 1500)
    console.log(comments);

    clearInput();
}

function getComment() {
    const textMessage = document.querySelector("#inputText")
    if (textMessage.value == 0) return false;
    let dateComm = dateComment();
    const blockHtmlDateComment = styleBlockComment(dateComm);
    const blockHtmlComment = blockHtmlDateComment + textMessage.value;
    return blockHtmlComment + "<br>";
}

function styleBlockComment(dateC) {
    return `<br><div class="comment" style="font-size: 10px; color: rgb(218, 218, 218)">${dateC}<br><hr style="border: 1px solid rgb(218, 218, 218); width: 100px;"></div>`;
}

function clearInput() {
    const textMessage = document.querySelector("#inputText")
    textMessage.value = "";
}

function dateComment() {
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();
    let day = data.getDate();
    let hour = data.getHours();
    let minutes = data.getMinutes();
    let seconds = data.getSeconds();
    let dateC = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    return dateC;
}

function setComment(text) {
    comments.push(text);
}


function showMessage() {
    const message = document.querySelector(".message");

    fetch("https://api.nasa.gov/planetary/apod?api_key=hCdzwUr8PmMQJH2uKAsY5jt2D5o11Q5LgregNtBN")
        .then(response => response.json())
        .then(data => {
            let video = data.url.indexOf("youtube")
            if (video) message.innerHTML = `<iframe class="video" src="${data.url}" frameborder="0" allowfullscreen></iframe>`
            else message.innerHTML = `<img src="${data.url}" alt="">`
        })

        .catch(err => {
            console.log(err);
        })
}




//script code
showMessage();

let comments = [];
const butComment = document.querySelector("#butComment");
butComment.addEventListener("click", showComment);

const inputText = document.querySelector("#inputText");
inputText.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) showComment();
});