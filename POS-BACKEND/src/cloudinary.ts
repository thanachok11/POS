import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // จากที่เก็บใน .env
  api_key: process.env.CLOUDINARY_API_KEY,        // จากที่เก็บใน .env
  api_secret: process.env.CLOUDINARY_API_SECRET   // จากที่เก็บใน .env
});
