// Test deps
var should = require("should");
var stdout = require("test-console").stdout;

// Dev deps
var main = require("./../lib/index");
var githubApi = require("./../lib/githubApi");
var utils = require("./../lib/utils");
var repoHelper = require("./../lib/repoHelper");
var queryBuilder = require("./../lib/queryBuilder");

const TestConstants = {
    SampleQuery: "gulp+language:javascript",
    SampleTopic: "bitcoin",
    SampleLanguage: "javascript",
    QueryOptions: {
        perPage: 10,
        maxPages: 2
    }
};

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
        
        this.timeout(5000);
        
        var query = TestConstants.SampleQuery;
        var options = TestConstants.QueryOptions;
        
        githubApi.searchRepos(query, options, function(data) {
            console.log("Got a response");
            data.length.should.not.eql(0);
            done();
        })
    });   
    
    it("should be able to build a url", function(done) {
        
        var url = githubApi.buildUrl(TestConstants.SampleQuery, TestConstants.QueryOptions);
        
        url.should.eql("https://api.github.com/search/repositories?q=gulp+language:javascript&page=1&per_page=10");
        
        done();
    }); 
    
    it("should be able to request a single page with no options", function(done) {
        
        var query = TestConstants.SampleQuery;
        var options = TestConstants.QueryOptions;
        
        githubApi.searchReposPage(query, options, function(repos) {
            repos.items.length.should.eql(10);
            done();
        });
    }); 
    
    it("should be able to request an interval of pages", function(done) {

        this.timeout(3000);
                
        var query = TestConstants.SampleQuery;
        var options = TestConstants.QueryOptions;
        var startPage = 1;
        var endPage = 3;
        
        githubApi.searchReposPageInterval(query, options, startPage, endPage).then(function(data) {
            var totalItems = 0;
            data.forEach(function(element) {
                totalItems += element.items.length;                
            }, this);
            
            totalItems.should.eql((endPage - startPage + 1) * options.perPage);
            done();  
        });
    }); 
    
});

describe("queryBuilder tests", function() {
  
    it("should be able to construct query with all args", function(done) {
        var topic = TestConstants.SampleTopic;
        var language = TestConstants.SampleLanguage;
        var query = queryBuilder.buildQuery(topic, language, true, true, true, true, true);
        
        query.indexOf(TestConstants.SampleTopic).should.not.eql(-1);
        query.indexOf(TestConstants.SampleLanguage).should.not.eql(-1);
        query.indexOf("fork").should.not.eql(-1);
        query.indexOf("pushed").should.not.eql(-1);
        query.indexOf("MIT license").should.not.eql(-1);
        query.indexOf("contribute").should.not.eql(-1);
        query.indexOf("NOT deprecated").should.not.eql(-1);
        
        done();
    });   
});

describe("discovery end to end tests", function() {

    it("should be able to build query and search", function(done) {
       
        var topic = TestConstants.SampleTopic;
        var language = TestConstants.SampleLanguage;
        var query = queryBuilder.buildQuery(topic, language, true, true, true, true, true);
    
        var options = TestConstants.QueryOptions;
    
        githubApi.searchRepos(query, options, function(data) {
            data.length.should.not.eql(0);
            done();
        })
    });   
});