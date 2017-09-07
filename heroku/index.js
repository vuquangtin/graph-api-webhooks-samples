/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var xhub = require('express-x-hub');

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log(req);
  res.send('It works - QuangDH here!');
});

app.get(['/facebook', '/instagram'], function(req, res) {
  console.log('quangdh > get fb ...........................');
  if (
    req.param('hub.mode') == 'subscribe' &&
    req.param('hub.verify_token') == 'tokenq'
  ) {
    console.log('HUB_CHALLENGE=' + req.param('hub.challenge'));
    res.send(req.param('hub.challenge'));
  } else {
    res.sendStatus(400);
  }
});

app.get(['/zalo'], function(req, res) {
  console.log('zalo-------------------------------------------------------------1');
  res.sendStatus(200);

});

app.get(['/zaloappurl'], function(req, res) {
  console.log('zaloappurl-------------------------------------------------------------1');
  res.send('It works - QuangDH here!');
  res.sendStatus(200);

});

app.post('/facebook', function(req, res) {
  console.log('Facebook request body:');

  if (req.isXHub) {
    console.log('request header X-Hub-Signature found, validating');
    if (req.isXHubValid()) {
      console.log('request header X-Hub-Signature validated');
      res.send('Verified!\n');
    }
  }
  else {
    console.log('Warning - request header X-Hub-Signature not present or invalid');
    res.send('Failed to verify!\n');
    // recommend sending 401 status in production for non-validated signatures
    // res.sendStatus(401);
  }
  
  // { entry: [ { changes: [Object], id: '177451742755395', time: 1492253900 } ],
  console.log(req.body);
  console.log('.............................................1');
  console.log(req.body.entry);
  console.log('.............................................2');
  console.log(req.body.entry[0].changes);

  console.log('.............................................3');
  console.log('finish quangdh0');

  
  // Process the Facebook updates here
  res.sendStatus(200);
});

app.post('/instagram', function(req, res) {
  console.log('QuangDH - Instagram request body:');
  console.log(req.body);
  console.log('insta.............................................1');
  console.log(req.body.entry);
  console.log('insta.............................................2');
  // Process the Instagram updates here
  res.sendStatus(200);
});


app.post('/zalo', function(req, res) {
  console.log('QuangDH - zalo request body:');
  console.log(req.body);
  console.log('zalo.............................................1');

  // Process the Instagram updates here
  res.sendStatus(200);
});

app.listen();
