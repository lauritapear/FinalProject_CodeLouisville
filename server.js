//
// const Youtube = require("youtube-api")
//     , fs = require("fs")
//     , readJson = require("r-json")
//     , Lien = require("lien")
//     , Logger = require("bug-killer")
//     , opn = require("opn")
//     , prettyBytes = require("pretty-bytes")
//     ;
//
// const CREDENTIALS = readJson(`${__dirname}/credentials.json`);

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('videoUploads', ['videoUploads']);
var bodyParser = require('body-parser');

//  server = new Lien({
//     host: "localhost"
//   , port: 5000
// });
//
// var oauth = Youtube.authenticate({
//     type: "oauth"
//   , client_id: CREDENTIALS.web.client_id
//   , client_secret: CREDENTIALS.web.client_secret
//   , redirect_url: CREDENTIALS.web.redirect_uris[0]
// });
//
// opn(oauth.generateAuthUrl({
//     access_type: "offline"
//   , scope: ["https://www.googleapis.com/auth/youtube.upload"]
// }));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/uploads', function (req, res) {
  db.videoUploads.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/uploads', function (req, res) {
  db.videoUploads.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/uploads/:id', function (req, res) {
  var id = req.params.id;
  db.videoUploads.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/uploads/:id', function (req, res) {
  var id = req.params.id;
  db.videoUploads.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/uploads/:id', function (req, res) {
  var id = req.params.id;
  db.videoUploads.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, lastName: req.body.lastName, class: req.body.class,
    university:req.body.university, video:req.body.video, videoTitle:req.body.videoTitle,
    videoDescription:req.body.videoDescription}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

// app.get("/oauth2callback",function (req, res) {
// console.log("hello from the callback!");
// oauth.getToken(lien.query.code, (err, tokens) => {
//
//     if (err) {
//         lien.lien(err, 400);
//         return Logger.log(err);
//     }
//
//     Logger.log("Got the tokens.");
//
//     oauth.setCredentials(tokens);
//
//     lien.end("The video is being uploaded. Check out the logs in the terminal.");
//
//     var req = Youtube.videos.insert({
//         resource: {
//             // Video title and description
//             snippet: {
//                 title: "Testing YoutTube API NodeJS module"
//               , description: "Test video upload via YouTube API"
//             }
//             // I don't want to spam my subscribers
//           , status: {
//                 privacyStatus: "private"
//             }
//         }
//         // This is for the callback function
//       , part: "snippet,status"
//
//         // Create the readable stream to upload the video
//       , media: {
//             body: fs.createReadStream("video.mp4")
//         }
//     }, (err, data) => {
//         console.log("Done.");
//         process.exit();
//     });
//
//     setInterval(function () {
//         Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
//     }, 250);
// });
// });


app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});
