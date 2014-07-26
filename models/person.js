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


// Working findBy function
Person.findBy = function(key, val, callback) {

  db.query("SELECT * FROM people WHERE " + key + "=$1",[val], function(err, res){
    var foundRow, foundPerson;
    foundRow = res.rows[0];
    foundPerson = new Person(foundRow);

    callback(err, foundPerson);
  });
};


// Person.create db query works
// takes an object with first and last name as parameters
// newPerson object has id = undefined
Person.create = function(params, callback){
  db.query('INSERT INTO people (firstname, lastname) VALUES ($1, $2);',
    [params.firstname, params.lastname], 
    function(err, res){
      // console.log("Running Person.create");
      var createdRow, newPerson;
      Person.findBy('firstname', params.firstname, function(err, newPerson){
        // console.log(newPerson);
        
        callback(err, newPerson);            
      });
    });
};



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

Person.prototype.destroy = function(callback){
  // console.log("Starting destroy function..........");
  db.query("DELETE FROM people WHERE id =$1;", [this.id], function(err, res) {
    // console.log("err: ", err);
    // console.log("res: ", res);
    callback(err);
  });
}


module.exports = Person;




