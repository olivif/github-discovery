const githubSearchRepos = require("github-search-repos");
const request = require("request");

function searchReposGSR(query, callback) {
   	githubSearchRepos(query, function (error, data) {
		callback(data.items);
	}); 
}

function searchReposR(query, callback) {
    
    var options = {
        url: "https://api.github.com/search/repositories?q=" + query,
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

function searchRepos(query, callback) {
    // searchReposGSR(query, callback);
    searchReposR(query, callback);
}

module.exports = {
    searchRepos: searchRepos
}