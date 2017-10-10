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
    browser.storage.local.set('url', new_url);
}

function addMoreLinks(result) {
    console.log(result);
    browser.storage.local.set(
        {
            'url': result.url + "\n" + new_url
        });
}

function restoreOptions() {
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(setData, errorData);
}

function setData(result) {
    all_urls = result.url.split("\n");
    let unique_urls = new Set();
    let i;
    for (i = 0; i < all_urls.length; i++)
        unique_urls.add(all_urls[i]);
    console.log(unique_urls);
    for (let u of unique_urls) {
        $("#allowed_urls").append("<p class='label'>" + u + "</p>");
    }
}

function errorData(error) {
    console.log(`Error: ${error}`);
}

document.querySelector("form").addEventListener("submit", startCheck);