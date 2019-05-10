// Includes
const rp = require('request-promise');
const cheerio = require('cheerio');
const robotsRegExp = new RegExp(/index/g)
// Exports
module.exports.crawl = function(url, cb) {
    if(url.substring(0, 7) == 'http://') {
        crawlsite(url, function(html) {
            fetchData(html, url, function(meta) {
                cb(meta)
            })
        })
    } else if(url.substring(0, 8) == 'https://') {
        crawlsite(url, function(html) {
            fetchData(html, url, function(meta) {
                cb(meta)
            })
        })
    } else {
        crawlsite('https://' + url, function(html) {
            if(html) {
                fetchData(html, 'https://' + url, function(meta) {
                    cb(meta)
                })
            } else {
                crawlsite('http://' + url, function(html) {
                    if(html) {
                        fetchData(html, 'http://' + url, function(meta) {
                            cb(meta)
                        })
                    } else {
                        cb(false);
                    }
                })
            }
        })
    }

}
function crawlsite(url, cb) {
    rp(url)
        .then(function(html) {
            cb(html);
        })
        .catch(function(err) {
            cb(false);
        })
}
function fetchData(html, url, cb) {
    var $ = cheerio.load(html);
    var robots = $('meta[name="robots"]').attr('content');
    if(robots == undefined || robotsRegExp.test(robots)) {
        var keywords = $('meta[name="keywords"]').attr('content');
        var description = $('meta[name="description"]').attr('content');
        var copyright = $('meta[name="copyright"]').attr('content');
        var title = $('title').text();
        var links_raw = $('a');
        links = [];
        if(links_raw != undefined) {
            for(var i = 0; i < links_raw.length; i++) {
                if(links_raw[i].attribs.href != undefined) {
                    var c_url = links_raw[i].attribs.href;
                    if(c_url.substring(0, 1) == '/') {
                        links.push(url + c_url);
                    } else {
                        if(c_url.substring(0, 7) == 'http://') {
                            links.push(c_url);
                        } else if(c_url.substring(0, 8) == 'https://') {
                            links.push(c_url);
                        } else if(c_url.substring(0, 4) == 'www.') {
                            links.push(c_url);
                        } else {
                            links.push(url + '/' + c_url);
                        }
                    }
                }
            }
        }
        var rank = 0;
        if(keywords != undefined) {
            rank++;
        } if(description != undefined) {
            rank++;
        } if(copyright != undefined) {
            rank++;
        } if(title != undefined) {
            rank++;
        }
        cb({
            keywords: keywords,
            description: description,
            copyright: copyright,
            title: title,
            links: links,
            rank: rank,
            url: url
        })
    } else {
        cb(false);
    }
}
