import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: join(process.cwd(), 'tmp', 'upload'), // Sesuaikan dengan direktori yang benar
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.originalname +
          '-' +
          uniqueSuffix +
          '.' +
          file.mimetype.split('/')[1],
      );
    },
  }),
};
