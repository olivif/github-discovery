const request = require("request");

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
    searchReposR(query, callback);
}

module.exports = {
    searchRepos: searchRepos
}