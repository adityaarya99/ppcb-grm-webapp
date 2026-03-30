import { Body, Controller, UseInterceptors, Get, UploadedFile, Post, Param, UseGuards, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GrievancesService } from './grievances.service';
import { CreateGrievanceDto } from './dto/create-grievance.dto';
import { Grievance } from './grievance.entity';
import { GrievanceSessionGuard } from '../public-access/cookie.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';

@Controller('grievances')
export class GrievancesController {
  constructor(private readonly grievancesService: GrievancesService) { }

  @UseGuards(GrievanceSessionGuard)
  @Post('submit')
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: diskStorage({
        destination: './uploads/grievance',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          return cb(new Error('Only images and PDF allowed'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createGrievanceDto: CreateGrievanceDto,
  ): Promise<any> {

    const fileNames = files && files.length
      ? files.map(f => f.filename)
      : undefined;

    return await this.grievancesService.submit(createGrievanceDto, fileNames);
  }

   @UseGuards(JwtAuthGuard)
  @Get('list')
  async getGrievanceList() {
    return await this.grievancesService.getList();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getGrievanceById(@Param('id') id: string) {
    return await this.grievancesService.getById(parseInt(id));
  }

}