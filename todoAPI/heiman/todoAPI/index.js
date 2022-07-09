const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const todos = ['apple', 'orange'];

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

module.exports.handler = function(req, resp, context) {
    resp.setHeader('content-type', 'application/json')
    var uri = (req.url).split('/')
    if(uri.length == 0) {
        resp.send(JSON.stringify({'code': 400, 'body':'Bad request'}, null, ''))
    } else {
        var route = uri[uri.length -1]
        console.log(route)
        switch(req.method) {
            case 'GET':
                //list all items in the list
                if(route == 'all'){
                    resp.send(JSON.stringify({'code':200, 'body':todos}))
                } else {
                    resp.send(JSON.stringify({'code':400, 'body':'Invalid endpoint!'}))
                }
                break
            case 'POST':
                //add one item in the list
                if(route == 'add') {
                    if(todos.indexOf(req.body.todo) == 1) {
                        resp.send(JSON.stringify({'code':400, 'body':'Duplicate and fail to add!'}))
                    } else {
                        todos.push(req.body.todo)
                        resp.send(JSON.stringify({'code':200, 'body':'Sucess to add:'+ req.body.todo}))
                    }
                } else {
                    resp.send(JSON.stringify({'code':400, 'body':'Invalid endpoint!'}))
                }
                break
            case 'DELETE':
                //remove one item in the list
                if(route == 'delete') {
                    if(todos.indexOf(req.body.todo) !== 1) {
                        resp.send(JSON.stringify({'code':400, 'body':'item not exists!'}))
                    } else {
                        todos.pop(req.body.todo)
                        resp.send(JSON.stringify({'code':200, 'body':'Sucess to delete:'+ req.body.todo}))
                    }
                } else {
                    resp.send(JSON.stringify({'code':400, 'body':'Invalid endpoint!'}))
                }

                //remove all items in the list
                if(route == 'deleteall') {
                    if(todos == null) {
                        resp.send(JSON.stringify({'code':404, 'body':'No item find!'}))
                    } else {
                        todos = []
                        resp.send(JSON.stringify({'code':200, 'body':''}))
                    }
                }
        }
    }
}
