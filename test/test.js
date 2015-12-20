// Test deps
var should = require("should");
var stdout = require("test-console").stdout;

// Dev deps
var main = require("./../lib/index");

describe("discovery end to end tests", function() {
  
    it("should be able to print a repo", function(done) {
        
        var repo = {
            full_name: "Full name",
            url: "repoUrl"    
        };
        
        var output = stdout.inspectSync(function() {
            main.printRepo(repo);
        });
        
        should.deepEqual(output, [ "\n", "Full name\n", "repoUrl\n" ]);
        done();
    });
      
    it("should be able to search repos", function(done) {
        
        var query = "gulp+language:javascript";
        
        main.searchRepos(query, function(repos) {
            repos.length.should.not.eql(0);
            done();
        })
    });      
});
