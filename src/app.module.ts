// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Call, CallSchema } from './call/call.schema';
import { CallModule } from './call/call.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
    CallModule,
  ],
})
export class AppModule {}
