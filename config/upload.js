const fs = require('fs');
const AWS = require('aws-sdk');
const { S3 } = require('@aws-sdk/client-s3');

const uploadFile = fileName => {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: 'human-music-podcast',
    Key: 'recording1',
    Body: fileContent,
  };
  S3.upload(params, function (err, data) {
    if (err) throw err;
    console.log(
      `The file was uploaded successfully, the location is: ${data.location}`,
    );
  });
};
