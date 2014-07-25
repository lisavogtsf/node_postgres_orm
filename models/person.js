var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){
  db.query("SELECT * FROM people ",[], function(err, res){
    var allPeople = [];

    if(err){
      console.log("error!");
    } else {
      res.rows.forEach(function(paramsFoo){
        allPeople.push(new Person(paramsFoo));
      });
      console.log("Running Person.all");
    }
    callback(err, allPeople);
  });
}

Person.findBy = function(key, val, callback) {
  // key is column name, val is what you are looking for in that column
  console.log("query is: WHERE " + key + "=$1",[val]);
  db.query("WHERE " + key + "=$1 VALUES",[val], function(err, res){
    var foundRow, foundPerson;
    // do something here with res
    // find a book using 
    callback(err, foundPerson);
  });
};



Person.create = function(params, callback){
  db.query('INSERT INTO people (firstname, lastname) VALUES ($1, $2);',
    [params.firstname, params.lastname], 
    function(err, res){
      // console.log(res);
      console.log("Running Person.create");
      var createdRow, newPerson;
      callback(err, newPerson);
    });
};


// I don't know how to properly pass in 
// parameters for update
Person.prototype.update = function(params, callback) {
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

  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}

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

module.exports = Person;




