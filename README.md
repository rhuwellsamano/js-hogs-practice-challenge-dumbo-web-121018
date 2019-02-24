# Hogs Practice Challenge

## JavaScript Week 2 Project

This is a brief introduction to the hogs you'll see in Hogwarts, which you'll be more fully introduced to in mod 4 - Hogwarts: The React app for fans of prize-winning pigs.

## Project deliverables:
* create an index displaying all hogs, and their attributes. you can create divs and give them the class hog-card to get some styling (done)
* since greased is a boolean, display that as a checkbox that is either checked if the hog is greased, or unchecked if not (done)
* create a form that will both post a new hog to the server, and render your fresh hog on the page (done)
* add delete buttons for each hog, which both removes them from the page, and instructs the server to delete that hog record (done)
* make the checkbox work so you can grease/ungrease each hog at will. this should persist in the database as well (done)

## What we have so far:

* a file containing all our hog data
* a folder of hog images
* an index.html file complete with css, a non-functional form for new hogs, and a div meant to contain all the hogs

## How to start:

In order to serve up our hogs, we'll be spinning up a json-server with this command: `json-server --watch hogs.json`.
That way, we can access our hog api at http://localhost:3000/hogs.
You can start writing JavaScript in src/index.js. There's also a file defining a Hog class, if you'd like to take an object oriented approach, but feel free to approach this any way you'd like.
