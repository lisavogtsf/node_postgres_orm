var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

// working, ugly
// corresponds to Person.all, uses index.ejs
// and shows all people
app.get("/people", function(req, res){
  Person.all(function(err, allPeople){
  res.render("people/index", {people: allPeople})
  })
});

// Sort of corresponds to Person.create, 
// uses new.ejs to display form for adding
// someone to the database
app.get("/people/new", function(req, res){
  res.render("people/new")
});

// corresponds to Person.findBy, uses show.ejs
app.get("/people/:id", function(req,res){
  var personId = req.params.id;
  Person.findBy("id", personId, function(err, person){
    res.render("people/show", {person: foundPerson });
  });
});

// Sort of corresponds to Person.prototype.update
// uses edit.ejs, it shows the page where you
// can make changes, but it doesn't make the changs
app.get("/people/:id/edit", function(req,res){

  res.render("people/edit", {person: {} });
});

// corresponds to People.create, uses new.ejs
// this is the action of creating someone new
app.post("/people", function(req, res){
  res.redirect("/people")
});

// corresponds to Person.prototype.delete
// probably uses edit.ejs
app.delete("/people/:id", function(req, res){
  res.redirect("/people");
});

// correponds to Person.prototype.update
// uses index.ejs after it updates the 
// database using form data from edit.ejs
app.put("/people/:id", function(req,res){
  res.redirect("/people");
})

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
