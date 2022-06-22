import dotenv from 'dotenv';
import aws from 'aws-sdk';

const region = 'us-east-2';
const bucketName = process.env.S3_BUCKETNAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const randomId = uuidv4();

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 4,
});

export async function generateUploadURL() {
  const params = {
    Bucket: bucketName,
    Key: randomId,
    Expires: 60,
  };
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return { uploadUrl, randomId };
}
