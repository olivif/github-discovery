var githubSearchRepos = require("github-search-repos");
var utils = require("./../lib/utils");

function searchRepos(query, callback) {
	
	githubSearchRepos(query, function (error, data) {
        console.log(data);  
        console.log(data.items.length);  
        var items = data.items;
        data.items = [];
		callback(items);
	});
}

function printRepo(repo) {
	console.log();
	// console.log(repo);
	console.log(repo.full_name);
	console.log(repo.url);
}	

function buildQuery(
    topic, 
    language, 
    forksIncluded, 
    recentlyUpdated,
    mitLicense,
    contribute,
    notDeprecated) {
    var query = "";
    
    if (topic) {
        query += topic;
    }
    if (language) {
        query += "+language:" + language;
    }
    if (forksIncluded) {
        query += "+fork:" + true;
    }
    if (recentlyUpdated) {
        query += "+pushed:>" + utils.getLastMonth();
    }
    if (mitLicense) {
        query +="+MIT license in:readme";
    }
    if (contribute) {
        query +="+contribute in:readme";
    }
    if (notDeprecated) {
        query += "+NOT deprecated";
    }
    return query;
}

function run(query) {
	
	searchRepos(query, function(repos) {
		repos.forEach(function(repo) {
			printRepo(repo);
		}, this);
		
		console.log("\nGot " + repos.length + " repos in total!");
	})
}

module.exports = {
	searchRepos: searchRepos,
	printRepo: printRepo,
    buildQuery: buildQuery,
	run: run
};