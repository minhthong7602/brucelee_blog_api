import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { diskStorage } from 'multer';

@Controller('upload-file')
export class UploadFileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadedFile (@UploadedFile() file) {
    console.log('file', file);
    const response = {
      originalname: file.originalname,
      filename: file.filename
    }

    return response;
  }

}
