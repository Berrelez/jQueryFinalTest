# jQuery ToDo

Complete a ToDo application with the following features:

  - Ability to add/update/remove tasks
  - Filter tasks to show incomplete tasks or all tasks
  - Display count of incomplete tasks

Each task should have the following properties:
  - id (guid)
  - description (string)
  - done (true/false)

A storage service is available as *window.todoStore*. It has the following methods:
 - newId
 - list
 - add
 - update
 - remove

The *newId* method is asynchronous and can be passed a callback funtion to receive the new id. If no callback function is provided it will return a jQuery promise.
