const got = require("got");
const cheerio = require("cheerio");

exports.normalizeText = function(array) {
    if (Object.prototype.toString.call(array) == "[object Array]") {
        var string = "";
        for (var c in array) {
            if (array[c].type == "text") {string = string + array[c].data}
            else if (
                array[c].type == "tag" && 
                array[c].children !== undefined && 
                array[c].children[0] !== undefined &&
                array[c].children[0].type == "text"
            ) {
                string = string + array[c].children[0].data;
            }
        }
        return string;
    } else {
        return array;
    }
}

function normalizeText(array) {
    if (Object.prototype.toString.call(array) == "[object Array]") {
        var string = "";
        for (var c in array) {
            if (array[c].type == "text") {string = string + array[c].data}
            else if (
                array[c].type == "tag" && 
                array[c].children !== undefined && 
                array[c].children[0] !== undefined &&
                array[c].children[0].type == "text"
            ) {
                string = string + array[c].children[0].data;
            }
        }
        return string;
    } else {
        return array;
    }
}

exports.moreResults = function (href, info, cb) {
    got(href, {
        headers: {
            "Host": "www.bing.com",
            "User-Agent": info.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": info.lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": info.ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        }
    }).then(function(resp) {
        var $ = cheerio.load(resp.body);
        var results = [];
        for (var c in $("#b_results .b_algo")) {
            if (
                $("#b_results .b_algo h2 a")[c] == undefined || 
                $("#b_results .b_algo h2 a")[c].children == undefined || 
                $("#b_results .b_algo h2 a")[c].children[0] == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == '!DOCTYPE html ""'
            ) {continue;}
            var resultTitle = normalizeText($("#b_results .b_algo h2 a")[c].children);
            var resultLink = $("#b_results .b_algo h2 a")[c].attribs.href;
            var desc = normalizeText($("#b_results .b_algo .b_caption p")[c].children);
            var result = {
                "title": resultTitle,
                "url": resultLink,
                "description": desc
            };
            results.push(result);
        }
        cb(false, results)
    }).catch(function(err) {
        cb(err, null);
    })
}