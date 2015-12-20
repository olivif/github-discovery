const githubSearchRepos = require("github-search-repos");
const chalk = require("chalk");

const utils = require("./../lib/utils");

function searchRepos(query, callback) {
	
	githubSearchRepos(query, function (error, data) {
		callback(data.items);
	});
}

function printRepo(repo) {
	console.log();
	// console.log(repo);
	console.log(
        chalk.cyan(repo.full_name) + " *" + 
        chalk.yellow(repo.stargazers_count) + " w" + 
        chalk.magenta(repo.watchers_count) + " f" + 
        chalk.green(repo.forks_count));
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