var express = require("express");
const router = express.Router();

const mongojs = require("mongojs");
const Task = require("../models/tasks")





// Get All Tasks
router.get("/tasks", function(req, res, next) {
  Task.find({}, { _id: 1, title: 1 }, function(err, tasks) {
    if (err) {
      res.send(err);
    }

    let data = [];
    Object.keys(tasks).forEach(function(key) {
      let val = tasks[key];
      data.push([val.title, val._id]);
    });
    //res.json(tasks);
    //res.send(tasks);
    res.send(data);
  });
});


// Get Single Task
router.get("/task/:id", function(req, res, next) {
  db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Save Task

router.post('/task', function (req, res) {

   const newTast= new Task({
    title: req.body.title
   })

  newTast.save(function (err, newTask) {
      if (err) return console.error(err);
      res.json(newTask);
  })
})

router.delete("/task/:id", function(req, res, next) {
  Task.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});


// Update Task
router.put("/task/:id", function(req, res, next) {
  let task = req.body;
  let updTask = {};

  if (task.isDone) {
    updTask.isDone = task.isDone;
  }

  if (task.title) {
    updTask.title = task.title;
  }

  if (!updTask) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    Task.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTask,
      {},
      function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
  }
});



module.exports = router;
