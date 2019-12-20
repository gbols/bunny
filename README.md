[![Build Status](https://travis-ci.com/gbols/bunny.svg?branch=master)](https://travis-ci.com/gbols/bunny)
[![Coverage Status](https://coveralls.io/repos/github/gbols/bunny/badge.svg?branch=master)](https://coveralls.io/github/gbols/bunny?branch=master)
# Bunny Studio Todo

## The Users API Endpoint.
* POST /user/signup creates an account for a user
* POST /user/login logs a user into created account
  
* GET /user  returns all users
* GET /user/:id returns a specific user

* PUT /user/:id should update a user's account
* DELETE /user/:id delete a user `can only be done by an admin`;

## The Tasks API Endpoint.
* POST /task/add creates a new task
  
* GET /task/:id return a specific tasks
* GET /task it returns all the tasks

* PUT /taks/:id updates the details of a task
  
* DELETE /task/:id deletes a given task created.

### To Test Run Tests Simply.
1. git clone ``;
2. npm install
3. npm test

### To start the Server 
1. npm install
2. npm start


### Block diagram representing architecture.

One USER has many TASKS and a TASK belongs to one USER.