const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Timelessness = require('../../models/Timelessness');
const S3_BUCKET = process.env.S3_BUCKET;
const aws = require('aws-sdk');

router.get('/', async (req, res) => {
  try {
    const timelessnessess = await Timelessness.find({});
    res.json(timelessnessess);
  } catch (err) {
    console.log('Get route, the error was: ', err);
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body) {
      const newTimelessness = new Timelessness(req.body);
      newTimelessness.uniqueID = req.body.recordingUrl.slice(-36);
      await newTimelessness.save();
      return res.json({
        newTimelessness,
        msg: 'The recording was saved in the DB!',
      });
    }
    return res.json({ responseMessage: `Please add the information` });
  } catch (err) {
    console.log('Post route, the error was: ', err);
  }
});

router.get('/sign-s3', async (req, res) => {
  try {
    const fileType = req.query.type;
    const s3 = new aws.S3({
      region: 'us-east-2',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
    });
    const randomId = uuidv4() + '.mp3';
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: randomId,
      Expires: 60,
    };
    const data = await s3.getSignedUrlPromise('putObject', s3Params);
    const returnData = {
      signedUrl: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${randomId}`,
    };
    res.json(returnData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
