const request = require("request");
const Q = require("q");

module.exports = {
    searchRepos: searchRepos,
    searchReposPage: searchReposPage,
    searchReposPageInterval: searchReposPageInterval,
    buildUrl: buildUrl
};

const maxNumberOfItemsReturned = 1000;
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
            "User-Agent": "request"
        }
    };
    request(options, function(error, response, body) {
        callback(JSON.parse(body));
    });
}

function searchReposPagePromise(query, queryOptions) {
    var deferred = Q.defer();
    searchReposPage(query, queryOptions, function(data, error) {
        if (error) {
            console.log("Error " + error);
            deferred.reject(error);
        } else {
            console.log("Got data");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

function searchReposPageInterval(query, queryOptions, startPage, endPage) {

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
        var maxPages = maxNumberOfItemsReturned / queryOptions.perPage;
        var pagesNeeded = Math.round(data.total_count / queryOptions.perPage);
        var max = Math.min(maxPages, queryOptions.maxPages);
        var pages = Math.min(max, pagesNeeded);
        console.log("pages " + pages + " max = " + max);
        
        searchReposPageInterval(query, queryOptions, 1, pages).done(function(data) {
            var allItems = [];
            data.forEach(function(element) {
                console.log("Length = " + element.items.length);
                allItems = allItems.concat(element.items);
            }, this);
            
            console.log("Returning " + allItems.length + " items");
            callback(allItems);
        });
    });
}

function searchRepos(query, queryOptions, callback) {
    searchReposAllPages(query, queryOptions, callback);
}