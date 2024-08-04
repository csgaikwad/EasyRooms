import { v2 as cloudinary } from 'cloudinary';
import config from './config.js';

cloudinary.config({
  cloud_name: config.secrets.cloudinary.cloud_name,
  api_key: config.secrets.cloudinary.api_key,
  api_secret: config.secrets.cloudinary.api_secret,
});

export default cloudinary;
