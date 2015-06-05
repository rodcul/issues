# Waffle Script

## Demo

https://waffle.io/makersacademy/issues

## Goal

Script to automatically tag issues based on how long they've been open to move them across a waffle board.

Issues can have the following statuses:

* Open
  * new
  * 2H
  * 6H
* Closed


## Setup instructions for Heroku


### Environment variables


```
$ heroku config:set REPO=issues
$ heroku config:set USER=makersacademy
$ heroku config:set GITHUB_API=XXXXXXXXXX
```

### Heroku Scheduler

Add the scheduler to your app:
```
$ heroku addons:create scheduler
```
Open scheduler on the Heroku website:
```
$ heroku addons:open scheduler
```
And create a new task with the following:

```
node waffleScript/updateLabels.js
```

## Task list

* [x] MVP: basic proof of concept
* [ ] Tests!
* [ ] Maintain previous labels not related to waffle script (currently DELETES them)

## Contributing :smile:

YES PLEASE, just submit a pull request!
