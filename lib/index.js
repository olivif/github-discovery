const githubApi = require("./../lib/githubApi");
const repoHelper = require("./../lib/repoHelper");

function run(query) {
	
	githubApi.searchRepos(query, {}, function(repos) {
		repos.forEach(function(repo) {
			repoHelper.printRepo(repo);
		}, this);
		
		console.log("\nGot " + repos.length + " repos in total!");
	})
}

module.exports = {
	run: run
};