const request = require("request");
const Q = require("q");

module.exports = {
    searchRepos: searchRepos,
    searchReposPage: searchReposPage,
    searchReposPageInterval: searchReposPageInterval,
    buildUrl: buildUrl
}

const defaultItemsPerPage = 100;
const githubApiBase = "https://api.github.com/search/repositories";

function buildUrl(query, options) {
    
    var url = "";
    url += githubApiBase; // base 
    url += "?q=" + query; // query text
    url += "&page=" + ((options.currentPage !== undefined) ? options.currentPage : 1); // page     
    url += "&per_page=" + ((options.perPage !== undefined) ? options.perPage : defaultItemsPerPage); // paging
    
    console.log(url);
    return url;
}

function searchReposPage(query, queryOptions, callback) {
    
    var options = {
        url: buildUrl(query, queryOptions),
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, function (error, response, body) {
        callback(JSON.parse(body));
    })
}

function searchReposPagePromise(query, queryOptions) { 
    var deferred = Q.defer() 
    searchReposPage(query, queryOptions, function (data, error) { 
        if (error) { 
            deferred.reject(error); 
        } else {
            deferred.resolve(data);
        }
    }) 
    return deferred.promise;
} 

function searchReposPageInterval(query, queryOptions, startPage, endPage, callback) {

    var promises = [];    
    for (var page = startPage; page <= endPage; page++) {
        promises.push(searchReposPagePromise(query, {
            currentPage: page,
            perPage: queryOptions.perPage 
        }));
    }
    
    return Q.all(promises); 
}

function searchReposAllPages(query, queryOptions, callback) {
    // Make the first request to get the number of total items
    searchReposPagePromise(query, queryOptions).then(function(data) {
        console.log("Got data " + data.total_count);
        callback(data);
    });    
}

function searchRepos(query, queryOptions, callback) {
    searchReposAllPages(query, queryOptions, callback);
}