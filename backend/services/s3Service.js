import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFileToS3 = async (file) => {
  const fileContent = fs.readFileSync(file.path);
  const fileName = path.basename(file.path);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};

export { uploadFileToS3 };
