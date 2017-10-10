let searchHistory = browser.history.search({text: ""});
let list = $("#content");
let list_of_urls = {};
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
    getMostViewedListOfURLs(list_of_urls)
});

function getMostViewedListOfURLs(list_of_urls) {
    for (let url_obj in list_of_urls) {
        let row = document.createElement("div");
        $(row).addClass("row");

        let a_tag = document.createElement("a");
        $(a_tag).text(list_of_urls[url_obj].name); $(a_tag).attr("href", list_of_urls[url_obj].url);
        let first = create_a_row(8, "small"); $(first).append(a_tag);


        let p_tag_2 = document.createElement("p");
        $(p_tag_2).text(list_of_urls[url_obj].count_f);
        let second = create_a_row(4, "small"); $(second).append(p_tag_2);
        let font_type = getFontSizeforDownloads(list_of_urls[url_obj].count_f);
        if (font_type === 1) {$(second).addClass("medium");}
        else if(font_type === 2) {$(second).addClass("big");}
        else {$(second).addClass("small");}
        $(row).append(first); $(row).append(second);
        list.append(row);
    }
}

function create_a_row(num, type) {
    let col_size = type + "-"+ num;
    let col = document.createElement("div");
    $(col).addClass(col_size).addClass("column");
    return col;
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