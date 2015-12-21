module.exports = {
    getLastMonth: getLastMonth
};

function getLastMonth() {
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    
    var dateAsString = "Y-m-d"
        .replace("Y", date.getFullYear())
        .replace("m", date.getMonth())
        .replace("d", date.getDate());
  
    return dateAsString;
}