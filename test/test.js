// Test deps
var should = require("should");
var stdout = require("test-console").stdout;

// Dev deps
var main = require("./../lib/index");
var githubApi = require("./../lib/githubApi");
var utils = require("./../lib/utils");
var repoHelper = require("./../lib/repoHelper");
var queryBuilder = require("./../lib/queryBuilder");

describe("repo tests", function() {
  
    it("should be able to print a repo", function(done) {
        
        var repo = {
            full_name: "Full name",
            url: "repoUrl"   ,
            stargazers_count: 10,
            watchers_count: 1,
            forks_count: 8
        };
        
        var output = stdout.inspectSync(function() {
            repoHelper.printRepo(repo);
        });
        
        output[1].indexOf(repo.full_name).should.not.eql(-1);
        output[1].indexOf(repo.stargazers_count).should.not.eql(-1);
        output[1].indexOf(repo.watchers_count).should.not.eql(-1);
        output[1].indexOf(repo.forks_count).should.not.eql(-1);
        output[2].indexOf(repo.url).should.not.eql(-1);
        done();
    });   
});

describe("utils tests", function() {
  
    it("should return correct last month date string", function(done) {
        
        var now = new Date();
        var lastMonthString = now.getFullYear() + "-" + (now.getMonth()-1) + "-" + now.getDate();
        var lastMonth = utils.getLastMonth();
        
        lastMonth.should.eql(lastMonthString);
        
        done();
    });
});

describe("githubApi tests", function() {
  
    it("should be able to search repos", function(done) {
        
        var query = "gulp+language:javascript";
        
        githubApi.searchRepos(query, function(repos) {
            repos.length.should.not.eql(0);
            done();
        })
    });   
});

describe("queryBuilder tests", function() {
  
    it("should be able to construct query with all args", function(done) {
        var topic = "myTopic";
        var language = "javascript";
        var query = queryBuilder.buildQuery(topic, language, true, true, true, true, true);
        
        query.should.eql("myTopic+language:javascript+fork:true+pushed:>2015-10-20+MIT license in:readme+contribute in:readme+NOT deprecated");
        
        done();
    });   
});

describe("discovery end to end tests", function() {

    it("should be able to build query and search", function(done) {
       
        var topic = "bitcoin";
        var language = "javascript";
        var query = queryBuilder.buildQuery(topic, language, true, true, true, true, true);
    
        githubApi.searchRepos(query, function(repos) {
            repos.length.should.not.eql(0);
            done();
        })
    });   
});