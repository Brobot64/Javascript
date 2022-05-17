// basic api
// const { request } = require('express');
var Userdb = require('../model/model');
// const res = require('express/lib/response');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    // if user submits an empty request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    //new user: specify the user variable (instance)
    //show where the request would be read from
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            res.send(data)
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating the user profile"
            });
        });

}

/**
 * @observation made during the course of this project, the requests comes before the response
 */

// retrieve and return all users/ retrieve and return single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({
                        message : `User with ID: ${id} not found`
                    })
                }
                else{
                    res.send(data)
                }
            })
            .catch (err => {
                res.status(500).send({
                    message : "Error retrieving User with ID: "+ id
                })
            })
    }
    else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message : err.message || "Error occurred while retrieving user information"
                })
            })}
}

// update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({
                message : "Data to update cannot be empty"
            })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body)
        .then (data => {
            if (!data) {
                res.status(404).send({
                    message : `Cannot Update User with id: ${id}. User not found`
                })
            }
            else {
                res.send(data)
            }
        })
        .catch (err => {
            res.status(500).send({
                message : "Error when updating User Information"
            })
        })
}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message : `Cannot Delete with id: ${id}. Id is wrong`
                })
            }
            else {
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Could not delete user with id: " + id
            });
        });
}