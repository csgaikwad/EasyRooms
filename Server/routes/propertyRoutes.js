import express from 'express';
import { addProperty, getProperties, getPropertyById, updateProperty ,uploadPhoto } from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', addProperty);
router.get('/', getProperties);
router.get('/:propertyId', getPropertyById);
router.put('/:propertyId', updateProperty);
router.post('/preview', uploadPhoto);

export default router;
