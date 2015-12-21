const round = require("round");
const HashMap = require("hashmap");

module.exports = {
    analyzeDistribution: analyzeDistribution
};

function printDistribution(buckets) {
    buckets.forEach(function(value, key) {
        console.log("bucket " + key + " -> " + value);
    });
}

function getDistribution(items, getter) {
    
    var buckets = new HashMap();
    items.forEach(function(item) {
        var number = getter(item); 
        var bucket = round.up(number, 100);
        if (!buckets.has(bucket)) {
            buckets.set(bucket, 0);
        } 
        buckets.set(bucket, buckets.get(bucket) + 1);
    }, this);
    
    return buckets;
}

function analyzeDistribution(items, getter, name) {
    console.log("Analyzing distribution: " + name);
    
    var distrib = getDistribution(items, getter);
    printDistribution(distrib);
}