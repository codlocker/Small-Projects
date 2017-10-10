/**
 * Created by shuttle3468 on 10/10/17.
 */
let getCurrent = null;
let new_url = "";
document.addEventListener("DOMContentLoaded", restoreOptions);

function startCheck(e) {
    e.preventDefault();
    getLink();
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(addMoreLinks, saveLinks);
}
function getLink() {
    new_url = $("#url_complete").val();
    console.log(new_url);
}
function saveLinks(error) {
    console.log(`Error: ${error}`);
    let unique_urls = new Set();
    unique_urls.add(new_url)
    browser.storage.local.set('url', unique_urls);
}

function addMoreLinks(result) {
    let res = new Set(result.url);
    res.add(new_url);
    browser.storage.local.set(
        {
            'url': res
        });
}

function restoreOptions() {
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(setData, errorData);
}

function setData(result) {
    let unique_urls = new Set(result.url);
    let i;
    for (let u of unique_urls) {
        console.log(u);
        $("#allowed_urls").append("<p class='label'>" + u + "</p><br>");
    }
}

function errorData(error) {
    console.log(`Error: ${error}`);
}

document.querySelector("form").addEventListener("submit", startCheck);