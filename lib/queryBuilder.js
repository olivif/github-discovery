const utils = require("./../lib/utils");

module.exports = {
    buildQuery: buildQuery
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