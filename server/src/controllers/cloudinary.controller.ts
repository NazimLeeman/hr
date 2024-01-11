import { Request,Response } from "express";
import multer from 'multer';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: 'dyx2rzyag',
    api_key: '425113663318185',
    api_secret: '_ffjpBZkUDoMy39ikj4eRwxX4Qc'
  });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export async function uploadImage(req: Request, res: Response) {
    try {
        upload.single('file')(req, res, async (err: any) => {
          if (err) {
            return res.status(400).json({ error: 'File upload failed' });
          }

          if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
          }
          const cloudinaryUpload = await cloudinary.v2.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                return res.status(500).json({ error: 'Cloudinary upload failed' });
              }
              res.json(result);
            }
          );
          (req.file.buffer as any).pipe(cloudinaryUpload);
        });
      } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}