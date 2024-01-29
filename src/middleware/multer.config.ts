import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './upload',
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
