var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
  
};

// Person.all function--working
// Show (SELECT) all records in people SQL table.
// Response res provides records which are turned into 
// new Person objects, used to populate allPeople array.
// In app.js allPeople array of Person objects is
// passed to index.ejs template.
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


// Person.findBy function--working
// Find people in SQL database using parameters: 
// key (column name) and val (cell/field data). 
// It is easiest to leave key as "id" and make
// val the id number of the person you want to find
// since id's are unique while names are not.
// SQL command SELECT searches for columns WHERE
// there is a matching cell value.
// DB response (res) provides a record which is
// turned into a Person object (foundPerson) which can be
// used by other methods or passed to a template.
Person.findBy = function(key, val, callback) {

  db.query("SELECT * FROM people WHERE " + key + "=$1",[val], function(err, res){
    if (err){
      console.error("Error in findBy!", err);
    } else {
      var foundRow, foundPerson;
      foundRow = res.rows[0];
      foundPerson = new Person(foundRow);
      console.log("Running Person.findBy");
    }
    callback(err, foundPerson);
  });
};

// Person.create--working
// Takes an object with keys firstname and lastname and
// corresponding values. SQL database command INSERT INTO 
// people table. Doing so makes the names into a fully-fledged
// record with an id and created date.  This method calls
// findBy (SELECT & WHERE), which provides the newly-added
// record in a res response.
// Person.create then turns that object into a new Person object.
 // This newPerson object is available to be passed to an ejs template. 
 // some error handling.
Person.create = function(params, callback){
  if (params.firstname == ""){
    console.log("Error! No first name supplied.");
  } else { 
    db.query('INSERT INTO people (firstname, lastname) VALUES ($1, $2);',
      [params.firstname, params.lastname], 
      function(err, res){
      if(err){
        console.log("Error!", err)
      } else {
        console.log("Running Person.create");
        var createdRow, newPerson;
        Person.findBy('firstname', params.firstname, function(err, newPerson){
          // console.log(newPerson); 
        });
      }
      callback(err, newPerson);
    });
  }
};

// Person.prototype.update--working
// As a prototype method, Person.prototype.update is called on a 
// specific Person object. It takes as parameters an object with 
// replacement name values for the Person it is called on.
// The current test in main.js uses findBy to provide a Person 
// (found by their id). Then the test calls person.update, supplying
//  replacement values in the params object.
// This is a fairly complicated function.  It 
// turns the params object's keys into column names 
// and the values into VALUES to be sent to the SQL database 
// using the UPDATE & SET commnds.
// The update method creates a copy of the original object
// it was called on and stores it in _this. Then it uses
// the db response (res) to update the values of the javascript
// Person object it was originally called on.  It passes the Person
// with updated values to the calling function as _this.

Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    console.log("Person.update: 'this'", this);
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

// Person.prototype.destroy -- working
// As a prototype method, destroy is called on a specific Person
// object.  In main.js I tested this using findBy to supply a
// Person object, there are no other parameters.  Destro sends
// a DELETE command to the SQL database, using information 
// from the Person it was called on.  
// Wondering now if I need to do anything else to 
// get the person out of allPeople... Will see.
Person.prototype.destroy = function(callback){
  if(this instanceof Person == false){
    console.log("Error! No person to delete");
  } else {
    db.query("DELETE FROM people WHERE id =$1;", [this.id], function(err, res) {
      // console.log("err: ", err);
      // console.log("res: ", res);
      console.log("Running destroy function");

      callback(err);
    });
  }
}


module.exports = Person;




