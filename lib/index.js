var githubSearchRepos = require("github-search-repos");
var utils = require("./../lib/utils");

function searchRepos(query, callback) {
	
	githubSearchRepos(query, function (error, data) {
		callback(data.items);
	});
}

function printRepo(repo) {
	console.log();
	console.log(repo.full_name);
	console.log(repo.url);
}	

function buildQuery(
    topic, 
    language, 
    forksIncluded, 
    recentlyUpdated) {
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