var githubSearchRepos = require("github-search-repos");

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

function run() {
	
	var query = "gulp+language:javascript";
	
	searchRepos(query, function(repos) {
		repos.forEach(function(repo) {
			printRepo(repo);
		}, this);
		
		console.log("\nGot " + repos.length + " repos in total!");
	})
}

run();

module.exports = {
	searchRepos: searchRepos,
	printRepo: printRepo,
	run: run
};