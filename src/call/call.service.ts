// call.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Call } from './call.schema';
import { CreateCallDto } from './call.dto';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private readonly callModel: Model<Call>,
  ) {}
  // Create a new call record
  async create(createCallDto: CreateCallDto): Promise<Call> {
    const createdCall = new this.callModel(createCallDto);
    return createdCall.save();
  }
  // Retrieve all call records
  async findAll(): Promise<Call[]> {
    return this.callModel.find().exec();
  }
  // Retrieve a call record by ID
  async findOne(id: string): Promise<Call | null> {
    return this.callModel.findById(id).exec();
  }
  // Update a call record by ID
  async update(id: string, updateCallDto: CreateCallDto): Promise<Call | null> {
    return this.callModel
      .findByIdAndUpdate(id, updateCallDto, { new: true })
      .exec();
  }
  // Remove a call record by ID
  async remove(id: string): Promise<Call | null> {
    const result = await this.callModel.findByIdAndDelete(id).lean().exec();
    return result as Call | null;
  }
  // AWS S3 bucket name obtained from environment variable
  AWS_S3_BUCKET = process.env.BUCKET_NAME;
  // AWS S3 client initialization with access key and secret access key from environment variables
  s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
  // Upload a file to AWS S3
  async uploadFile(file) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }
  // Internal method to perform the actual S3 upload
  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      //ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
