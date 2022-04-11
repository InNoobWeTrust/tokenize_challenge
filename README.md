# Tokenize coding challenge

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/InNoobWeTrust/tokenize_challenge)

[![Deploy to
Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/InNoobWeTrust/tokenize_challenge)

Host an Express.js app on Netlify using
[serverless-http](https://github.com/dougmoscrop/serverless-http).

[index.html](index.html) simply loads html from the Express.js app using
`<object>`, and the app is hosted at `/.netlify/functions/server`. Examples of
how to access the Express.js endpoints:

```sh
curl <hostname>/.netlify/functions/server
curl <hostname>/.netlify/functions/server/another
curl --header "Content-Type: application/json" --request POST --data '{"json":"POST"}' <hostname>/.netlify/functions/server
```

