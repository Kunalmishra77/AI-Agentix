import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/image', protect, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: { message: 'No file uploaded' } });
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder: 'ai-agentix' });
    res.json({ success: true, data: { url: result.secure_url, publicId: result.public_id } });
  } catch(e) { next(e); }
});

router.delete('/:publicId', protect, async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ success: true });
  } catch(e) { next(e); }
});

export default router;
