var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));
// CSS
app.use(express.static(__dirname + '/public'));
console.log(__dirname);


// app.get("/", function(req, res){
//   res.redirect("people/index");
// });

// working
// corresponds to Person.all, uses index.ejs
// and shows all people
app.get("/people", function(req, res){
  console.log("app.get(/people---Person.all");
  Person.all(function(err, allPeople){
  res.render("people/index", {people: allPeople})
  })
});

// working
// Sort of corresponds to Person.create, 
// uses new.ejs to display form for adding
// someone to the database
app.get("/people/new", function(req, res){
  res.render("people/new")
});

// working
// corresponds to Person.findBy, uses show.ejs
// trouble with error handling when I look for 
// a non-existant id
app.get("/people/:id", function(req,res){
  console.log("app.get(/people/:id---findBy");
  var personId = req.params.id;

  Person.findBy('id', personId, function(err, person){
    if(err) {
      console.error("Error!", err);
    } else {
      res.render("people/show", {person: person});
    }

  });
});

// Sort of corresponds to Person.prototype.update
// uses edit.ejs, it shows the page where you
// can make changes, but it doesn't make the changs
app.get("/people/:id/edit", function(req,res){

  res.render("people/edit", {person: {} });
});

// working
// corresponds to People.create, uses new.ejs
// this is the action of creating someone new
app.post("/people", function(req, res){
  // console.log("req.body ", req.body);
  var personToAdd = req.body;
  Person.create(personToAdd, function(err, newPerson){
    console.log(newPerson);
  });
  res.redirect("/people");
});

//
// corresponds to Person.prototype.delete
// probably uses edit.ejs
// Plan to use FindBy as I did in previous
// tests.  
app.delete("/people/:id", function(req, res){
  var deleteId = req.params.id;
  Person.findBy('id', deleteId, function(err, person){
    console.log(person);
    if(err) {
      console.error("Error!", err);
    } else {
      person.destroy(function(err, res){
        console.log("deleted person?", person);
      });
      res.redirect("/people");
    }
  });
});

// correponds to Person.prototype.update
// uses index.ejs after it updates the 
// database using form data from edit.ejs
app.put("/people/:id", function(req,res){
  res.redirect("/people");
});

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
