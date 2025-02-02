const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
// Test with: curl localhost:5000/user
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  let user = users.find((user)=> user.email === req.params.email);
  res.send(user);
});


// POST request: Create a new user
// Test with: curl --request POST 'localhost:5000/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995'
router.post("/",(req,res)=>{
  // save the new user in the users array
  users.push(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email:req.body.email,
      DOB:req.body.DOB,
    }
  );

  // send a response
  res.send("The user " + req.query.firstName + "has been added!");
});

// PUT request: Update the details of a user by email ID
// Test with: curl --request PUT 'localhost:5000/user/johnwick@gamil.com?DOB=1/1/1971'
router.put("/:email", (req, res) => {
  // get user based on email
  let filtered_users = users.find((user) => user.email === req.params.email);

  if(filtered_users.length > 0){
    let user = filtered_users[0];

    // update the user details
    let DOB = req.query.DOB;
    if(DOB){
      user.DOB = DOB;
    }

    let firstName = req.query.firstName;
    if(firstName){
      user.firstName = firstName;
    }

    let lastName = req.query.lastName;
    if(lastName){
      user.lastName = lastName;
    }

    // replace the user in the array
    users = users.filter((user) => user.email !== req.params.email);
    users.push(user);

    res.send(`User ${email} details updated successfully`);
  }
  else{
    res.send("User not found");
  }
});


// DELETE request: Delete a user by email ID
// Test with: curl --request DELETE 'localhost:5000/user/johnsmith@gamil.com'
router.delete("/:email", (req, res) => {
  let email = req.params.email;

  // filter out array to exclude user with email
  users = users.filter((user) => user.email !== email);

  res.send(`user ${email} deleted!`)//This line is to be replaced with actual return value
});

module.exports=router;
