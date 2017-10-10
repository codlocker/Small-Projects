let searchHistory = browser.history.search({text: ""});
let list = $(".content");
let list_of_urls = {};

searchHistory.then((results) => {
    if (results.length < 1) {

    } else {
        for (let k in results) {
            let history = results[k].url;
            var split_url = history.split("/");
            url = split_url[2].toString().trim();
            if (url in list_of_urls) {
                list_of_urls[url] += 1;
            } else {
                list_of_urls[url] = 1;
            }
        }
    }
    getMostViewedListOfURLs(list_of_urls)
});

function getMostViewedListOfURLs(list_of_urls) {
    for (let url in list_of_urls) {
        let row = document.createElement("div");
        $(row).addClass("row");

        let p_tag = document.createElement("p");
        $(p_tag).text(url);
        let first = create_a_row(8, "small"); $(first).append(p_tag);


        let p_tag_2 = document.createElement("p");
        $(p_tag_2).text(list_of_urls[url]);
        let second = create_a_row(4, "small"); $(second).append(p_tag_2);
        let font_type = getFontSizeforDownloads(list_of_urls[url]);
        if (font_type === 1) {$(second).addClass("medium");}
        else if(font_type === 2) {$(second).addClass("big");}
        else {$(second).addClass("small");}
        $(row).append(first); $(row).append(second);
        $(".content").append(row);
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