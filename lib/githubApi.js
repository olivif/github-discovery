const request = require("request");

module.exports = {
    searchRepos: searchRepos,
    buildUrl: buildUrl
}

const defaultItemsPerPage = 100;
const githubApiBase = "https://api.github.com/search/repositories";

function buildUrl(query, options) {
    
    var url = "";
    url += githubApiBase; // base 
    url += "?q=" + query; // query text
    url += "&per_page=" + ((options.perPage !== undefined) ? options.perPage : defaultItemsPerPage); // paging
    
    console.log(url);
    return url;
}

function searchReposR(query, queryOptions, callback) {
    
    var options = {
        url: buildUrl(query, queryOptions),
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data.items.length);
        callback(data.items);
    })
}

function searchRepos(query, queryOptions, callback) {
    searchReposR(query, queryOptions, callback);
}