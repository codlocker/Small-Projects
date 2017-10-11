let searchHistory = browser.history.search({text: ""});
let list = $("#content");
let list_of_urls = {};
let result = browser.storage.local.get('url');
let setList = new Set();
class UrlContent {
    constructor(url, name, count_f) {
        this.url = url;
        this.name = name;
        this.count_f = count_f;
    }
}
searchHistory.then((results) => {
    if (results.length < 1) {

    } else {
        for (let k in results) {
            let history = results[k].url;
            let split_url = history.split("/");
            url = split_url[2].toString().trim();

            if (url in list_of_urls) {
                list_of_urls[url].count_f += 1;
            } else {
                list_of_urls[url] = new UrlContent(history, url, 1);
            }
        }
    }
    notifyuserRegardingUsage();
});

function getMostViewedListOfURLs(list_of_urls) {
    for (let url_obj in list_of_urls) {
        let name_split = list_of_urls[url_obj].url.split("/");
        let name = name_split[0] + name_split[1] + name_split[2];
        for (let u of setList) {
            if (u.toString().includes(url_obj) && list_of_urls[url_obj].count_f > 10) {
                browser.notifications.create({
                    "type": "basic",
                    "iconUrl": browser.extension.getURL("icons/error.png"),
                    "title": "Activity Manager Extension",
                    "message": "You have visited " + url_obj + " page " + list_of_urls[url_obj].count_f + " times"
                });
            }
        }

        let row = document.createElement("div");
        $(row).addClass("row");

        let a_tag = document.createElement("a");
        $(a_tag).text(list_of_urls[url_obj].name); $(a_tag).attr("href", list_of_urls[url_obj].url);
        let first = createARow(8, "small"); $(first).append(a_tag);


        let p_tag_2 = document.createElement("p");
        $(p_tag_2).text(list_of_urls[url_obj].count_f);
        let second = createARow(4, "small"); $(second).append(p_tag_2);
        let font_type = getFontSizeforDownloads(list_of_urls[url_obj].count_f);
        if (font_type === 1) {$(second).addClass("medium");}
        else if(font_type === 2) {$(second).addClass("big");}
        else {$(second).addClass("small");}
        $(row).append(first); $(row).append(second);
        list.append(row);
    }
}

function createARow(num, type) {
    let col_size = type + "-"+ num;
    let col = document.createElement("div");
    $(col).addClass(col_size).addClass("column");
    return col;
}

function notifyuserRegardingUsage() {
    result.then(promisedList, errorData);
}

function promisedList(result) {
    setList = new Set(result.url);
    getMostViewedListOfURLs(list_of_urls);
}

function errorData(error) {
    console.log(`Error: ${error}`);
}

function getFontSizeforDownloads(num) {
    if (num > 10) {
        return 2;
    } else if(num > 5) {
        return 1;
    }else {
        return 0;
    }
}