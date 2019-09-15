const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
var ffmpeg = require('fluent-ffmpeg');

// default options
app.use(fileUpload());

ffmpeg.setFfmpegPath('/usr/local/Cellar/ffmpeg/4.1.4_2/bin/ffmpeg');

app.post('/upload', function(req, res,next) {
    console.log(req.files);


  let sampleFile  = req.files.mp4.name ;

  req.files.mp4.mv("tmp/" + sampleFile, function(err) {
    console.log(req.files.mp4.size);
    if (err)
      return null; //res.status(500).send(err);
      new Promise((resolve, reject)=> {
            ffmpeg('tmp/' + sampleFile)
  .on('filenames', function(filenames) {
     console.log('Will generate ' + filenames.join(', '))
   })
   .on('end', function() {
     console.log('Screenshots taken');
     
   })
   .screenshots({
     // Will take screens at 20%, 40%, 60% and 80% of the video
     count: 4,
     folder: '/Users/anindya/Desktop/Talview/tmp/screenshots',
     filename: 'thumbnail-at-%s-seconds.png'
   })

   if (Object.keys(req.files).length == 0) {
     res.status(400).send('No files were uploaded.');
  }
      })
      res.send('File uploaded!');
  })





//   ffmpeg('tmp/' + sampleFile)
//   .on('filenames', function(filenames) {
//      console.log('Will generate ' + filenames.join(', '))
//    })
//    .on('end', function() {
//      console.log('Screenshots taken');
     
//    })
//    .screenshots({
//      // Will take screens at 20%, 40%, 60% and 80% of the video
//      count: 4,
//      folder: '/Users/anindya/Desktop/Talview/tmp/screenshots',
//      filename: 'thumbnail-at-%s-seconds.png'
//    })

//    if (Object.keys(req.files).length == 0) {
//      res.status(400).send('No files were uploaded.');
//   }




   
});


app.listen(5000, () => {
    console.log("Started on port : 5000");
}); 
