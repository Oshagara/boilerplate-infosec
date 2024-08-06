const express = require('express');
const app = express();
const helmet = require('helmet');


/*It can help to provide an extra layer of security to reduce the ability of attackers to determine the software that a server uses, known as “fingerprinting.” 
Though not a security issue itself, reducing the ability to fingerprint an application improves its overall security posture. Server software can be fingerprinted 
by quirks in how it responds to specific requests, for example in the HTTP response headers.*/

app.use(helmet.hidePoweredBy());


/*Block ClickJacking--------For example, imagine an attacker who builds a web site that has a button on it that says “click here for a free iPod”. However, on top of that web page, 
the attacker has loaded an iframe with your mail account, and lined up exactly the “delete all messages” button directly on top of the “free iPod” button. 
The victim tries to click on the “free iPod” button but instead actually clicked on the invisible “delete all messages” button. In essence, the attacker has 
“hijacked” the user’s click, hence the name “Clickjacking”.*/

app.use(helmet.frameguard({action: 'deny'}));














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
