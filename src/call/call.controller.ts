//call.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CallService } from './call.service';
import { CreateCallDto } from './call.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}
  // Create a new call record
  @Post()
  create(@Body() createCallDto: CreateCallDto) {
    return this.callService.create(createCallDto);
  }
  // Retrieve all call records
  @Get()
  findAll() {
    return this.callService.findAll();
  }
  // Retrieve a call record by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callService.findOne(id);
  }
  // Update a call record by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCallDto: CreateCallDto) {
    return this.callService.update(id, updateCallDto);
  }
  // Remove a call record by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callService.remove(id);
  }
  // Upload a file using the provided FileInterceptor
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the name of the field in the form-data
  async uploadFile(@UploadedFile() file): Promise<any> {
    try {
      // Call the service method to handle file upload to AWS S3
      const s3Response = await this.callService.uploadFile(file);
      return { message: 'File uploaded successfully', data: s3Response };
    } catch (error) {
      console.error(error);
      // Handle errors during file upload and return an appropriate response
      return {
        message: 'Error uploading file',
        error: (error as any)?.message,
      };
      // or use: return { message: 'Error uploading file', error: String(error) };
    }
  }
}
