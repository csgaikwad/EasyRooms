import express from "express";
import { addProperty } from "../controllers/propertyController/addProperty.js";
import { getProperties } from "../controllers/propertyController/getProperties.js";
import { getPropertyById } from "../controllers/propertyController/getPropertyById.js";
import { updateProperty } from "../controllers/propertyController/updateProperty.js";
import { deleteProperty } from "../controllers/propertyController/deleteProperty.js";
import { uploadPhoto } from "../controllers/photoController/uploadPhoto.js";
import { deletePhoto } from "../controllers/photoController/deletePhoto.js";

const router = express.Router();

router.post('/', addProperty);
router.get('/', getProperties);
router.get('/:propertyId', getPropertyById);
router.put('/:propertyId', updateProperty);
router.post('/preview', uploadPhoto);
router.delete('/deletePhoto', deletePhoto);
router.delete('/deleteProperty', deleteProperty);


export default router;
