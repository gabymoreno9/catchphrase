# Catchphrase Editor Via Text

This project is a short app that changes the animated catchphrase on my
[portfolio site](http://www.gabbymoreno.com). The catchphrase is the
little blurb below my name. This project utilizes Express, body-parser, Twilio,
and Sequelize.

Express is a Javascript framework that provides a robust set of features for web
and mobile applications. Body-parser is Express middleware for reading the request
body and parsing it to JSON.

This project uses the [Twilio SDK](https://www.twilio.com/docs/libraries/node).

Sequelize is a library that allows us to connect to Postgress.



## How Does It Work?
I used a free postgress instance on Heroku which is where I host my blog, and I
used Sequelize to query and update the database. I'm using Express to create the
endpoints, and I'm importing the Twilio SDK to handle requests to my webhook.

There are only two endpoints. First is the post endpoint "/twilio", which will
be called by the twilio webhook. This creates a new row in the catchphrase table
with the contents of the text I sent to my Twilio phone number.

The other endpoint, "/message", queries the database and fetches all the catchphrases,
ordered by date they were created in descending order, then returns the most recent
catchphrase. If anything goes wrong, "oops, something went wrong :(" is sent.

In animations.js, we are making a request to the "/message" endpoint to get the
most recent catchphrase. Typed is the library used to get the typewriter effect going on.





**TLDR:** I send a text to a phone number acquired through Twilio and the contents of
that text gets pushed as the catchphrase of the index of my portfolio site.
