const got = require("got");
const cheerio = require("cheerio");
const utils = require("./utils")

exports.search = function(query, cb) {
    if (Object.prototype.toString.call(query) == "[object Object]") {
        if (!query.q) {cb({message: "No query defined.",code: "noQuery"}, null);}
        var q = query.q.toString();
        if (query.userAgent) { var ua = query.userAgent; } else { var ua = ""; }
        if (query.lang) { var lang = query.lang; } else { var ua = "en-US,en;q=0.5"; }
        if (query.referer) { var ref = query.referer; } else { var ref = "https://www.bing.com/"; }
        if (query.cookieString) { var cookies = query.cookieString; } else { var cookies = null; }
        if (query.enforceLanguage) { var enforceL = query.enforceLanguage; } else { var enforceL = false; }
        if (query.pageCount) { var pageCount = query.pageCount } else { var pageCount = 1; }
        var obj = {
            "q": q,
            "userAgent": ua,
            "lang": lang,
            "referer": ref,
            "cookieString": cookies,
            "pageCount": pageCount
        };
    } else {
        var q = query.toString();
        var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0";
        var lang = "en-US,en;q=0.5";
        var ref = "https://www.bing.com/";
        var cookies = null;
        var enforceL = true;
        var pageCount = 1;
        var obj = {
            "q": q,
            "userAgent": ua,
            "lang": lang,
            "referer": ref,
            "cookieString": cookies,
            "pageCount": pageCount
        };
    }
    
    if (enforceL == true) { 
        var url = "https://www.bing.com/search?q=" + q + "&search=&lf=1&form=QBLH" 
    } else { 
        var url = "https://www.bing.com/search?q=" + q + "&search=&form=QBLH"; 
    }

    got(url,
    {
        headers: {
            "Host": "www.bing.com",
            "User-Agent": ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        }
    }).then(async function(resp) {
        var $ = cheerio.load(resp.body);
        var rObj = {
            results: []
        };

        // web result scraping

        for (var c in $("#b_results .b_algo")) {
            if (
                $("#b_results .b_algo h2 a")[c] == undefined || 
                $("#b_results .b_algo h2 a")[c].children == undefined || 
                $("#b_results .b_algo h2 a")[c].children[0] == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == '!DOCTYPE html ""'
            ) {continue;}
            var resultTitle = utils.normalizeText($("#b_results .b_algo h2 a")[c].children[0].data);
            var resultLink = $("#b_results .b_algo h2 a")[c].attribs.href;
            if ($("#b_results .b_algo .b_caption p")[c] !== undefined && $("#b_results .b_algo .b_caption p")[c].children !== undefined) {
                var desc = utils.normalizeText($("#b_results .b_algo .b_caption p")[c].children);
            } else {
                var desc = "";
            }
            var result = {
                "title": resultTitle,
                "url": resultLink,
                "description": desc
            };
            rObj.results.push(result);
        }

        // top answer scraping
        if (
            $("#b_results .b_ans .b_tppFact .b_imagePair")[0] !== undefined ||
            $("#b_results .b_top .b_tppFact .b_imagePair .b_focusTextLarge")[0] !== undefined ||
            $("#b_results .b_top .b_tppFact .b_imagePair .b_focusLabel")[0] !== undefined 
        ) {
            var answer = utils.normalizeText($("#b_results .b_top .b_tppFact .b_imagePair .b_focusTextLarge")[0].children);
            var ansTit = utils.normalizeText($("#b_results .b_top .b_tppFact .b_imagePair .b_focusLabel")[0].children);
            if (
                $("#b_results .b_top .b_tppFact .b_imagePair .cico img")[0] !== undefined || 
                $("#b_results .b_top .b_tppFact .b_imagePair .cico img")[0].attribs["data-src-hq"] !== undefined
            ) {
                var src = "https://www.bing.com" + $("#b_results .b_top .b_tppFact .b_imagePair .cico img")[0].attribs["data-src-hq"]
            } else {var src = null;}
            rObj.topAnswer = { answer: answer, title: ansTit, image: src };
        } else {
            rObj.topAnswer = null;
        }

        // qna answer scraping
        if (
            $("#b_results .b_ans .qna-mf")[0] !== undefined ||
            $("#b_results .b_ans .qna-mf .b_vPanel .rwrl")[0] !== undefined ||
            $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0] !== undefined && 
            $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].children !== undefined
        ) {
            var answer = utils.normalizeText($("#b_results .b_ans .qna-mf .b_vPanel .rwrl")[0].children);
            var ansSrcTit = utils.normalizeText($("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].children);
            var ansSrcLnk = $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].attribs.href;
            rObj.qnaAnswer = { answer: answer, source: { title: ansSrcTit, url: ansSrcLnk } }
        } else {
            rObj.qnaAnswer = null;
        }

        // more web scraping, if requested
        if (pageCount == 1) {cb(false, rObj);} 
        else if (
            $(".sb_pagN")[0] !== undefined && 
            $(".sb_pagN")[0].attribs !== undefined &&
            $(".sb_pagN")[0].attribs.href !== undefined
        ) {
            var link = "https://www.bing.com" + $(".sb_pagN")[0].attribs.href;
            obj.pl = pageCount - 1;
            pageCount = pageCount - 1;
            var nObj = {
                link: link,
                obj: obj,
                p: pageCount,
                cb: cb,
                responseObject: rObj
            }
            repeatUntilZero(nObj);
        } else {
            cb(false, rObj);
        }
    }).catch(function(err) {
        cb(err, null);
    })
}

function repeatUntilZero(nObj) {
    var link = nObj.link;
    var obj = nObj.obj;
    var pageCount = nObj.p;
    var rObj = nObj.responseObject;
    var cb = nObj.cb;
    utils.moreResults(link, obj, function(err, resp) {
        if (err) {
            cb(false, rObj.results);
        } else {
            for (var c in resp) {rObj.results.push(resp[c]);}
            var newObj = nObj;
            newObj.p = (pageCount - 1);
            if (pageCount !== 0) {
                setTimeout(function(){
                    repeatUntilZero(newObj);
                }, 500)
            }
            else {cb(false, rObj);}
        }
    })
}