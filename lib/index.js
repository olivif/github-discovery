const githubApi = require("./../lib/githubApi");
const repoHelper = require("./../lib/repoHelper");

module.exports = {
    run: run
};

function run(query) {
	
    var queryOptions = {perPage: 100, maxPages: 1};
    
    githubApi.searchRepos(
        query,
        queryOptions,
        function(repos) {
            repos.forEach(function(repo) {
                repoHelper.printRepo(repo);
            }, this);
            
            console.log("\nGot " + repos.length + " repos in total!");
        }
    );
}