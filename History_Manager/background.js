/**
 * Created by shuttle3468 on 10/10/17.
 */
let getCurrent = null;
let new_url = "";

function startCheck(e) {
    e.preventDefault();
    getLink();
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(addMoreLinks, saveLinks);
}
function getLink() {
    new_url = $("#url_complete").val();
}
function saveLinks(error) {
    console.log(`Error: ${error}`);
    browser.storage.local.set('url', new_url);
}

function addMoreLinks(result) {
    browser.storage.local.set(
        {
            'url': result + "\n" + new_url
        });
}

function restoreOptions() {
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(setData, errorData);
}

function setData(result) {
    $("#allowed_urls").html(result);
}

function errorData(error) {
    console.log(`Error: ${error}`);
}

document.querySelector("form").addEventListener("submit", startCheck);
document.addEventListener("DOMContentLoaded", restoreOptions);