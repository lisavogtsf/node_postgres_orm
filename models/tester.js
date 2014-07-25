
// Person.findBy = function(key, val, callback)
var key = "firstname";
var val = 'Slim';
console.log("query is: WHERE " + key + "=$1",[val]);