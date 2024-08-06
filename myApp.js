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
/*
Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.
The basic rule to lower the risk of an XSS attack is simple: "Never trust user's input". As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. <, >.
Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers.
The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it. It still has limited support
*/
app.use(helmet.xssFilter({}));

/*
Browsers can use content or MIME sniffing to override the Content-Type header of a response to guess and process the data using an implicit content type. 
While this can be convenient in some scenarios, it can also lead to some dangerous attacks. This middleware sets the X-Content-Type-Options header to nosniff, 
instructing the browser to not bypass the provided Content-Type.
*/
app.use(helmet.noSniff());


/*
Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. 
This means that an untrusted HTML page could start doing bad things in the context of your pages. This middleware sets the X-Download-Options header to noopen. 
This will prevent IE users from executing downloads in the trusted site's context.
*/
app.use(helmet.ieNoOpen());

/*
HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking. 
If your website can be accessed via HTTPS you can ask user’s browsers to avoid using insecure HTTP. By setting the header Strict-Transport-Security, you tell 
the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the requests coming after the initial request.
*/

var ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));









































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
