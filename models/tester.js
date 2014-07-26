
// Person.findBy = function(key, val, callback)
var key = "firstname";
var val = 'Slim';
console.log("query is: WHERE " + key + "=$1",[val]);


Person.prototype.destroy = function(){
  // pasted in from update function
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }
  // pasted in from update function and altered
  var statement = "DELETE FROM people WHERE " + colNames.join(", ") + " id=$1";
  var values = [this.id].concat(colVals);
  console.log("Deleting:");
  console.log(statement, "with values", values);

  db.query(statement, [this.id], function(err, res) {
    callback(err)
  });
}

Person.prototype.destroyById = function(){
  db.query("DELETE FROM people WHERE", [this.id], function(err, res) {
    callback(err)
  });
}






