const Distribution = require("list-distribution");

module.exports = {
    analyzeDistribution: analyzeDistribution
};

function analyzeDistribution(items, getter, name) {
    console.log("Analyzing distribution: " + name);
    
    var distribution = new Distribution(items, getter, 100);
    distribution.printBuckets();
}