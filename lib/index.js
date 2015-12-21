const githubApi = require("./../lib/githubApi");
const repoHelper = require("./../lib/repoHelper");

module.exports = {
    run: run
};

function run(query, print, callback) {
	
    var queryOptions = {perPage: 100, maxPages: 3};
    
    githubApi.searchRepos(
        query,
        queryOptions,
        function(repos) {
            
            if (print) {
                repos.forEach(function(repo) {
                    repoHelper.printRepo(repo);
                }, this);
            }
            
            console.log("\nGot " + repos.length + " repos in total!");
            
            callback(repos);
        }
    );
}