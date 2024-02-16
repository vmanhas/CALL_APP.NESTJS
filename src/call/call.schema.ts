// call.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//call.schema.ts
@Schema()
export class Call extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  callType: string;

  @Prop({ required: true })
  callDuration: number;

  @Prop({ required: true })
  numberOfCalls: number;
}

export const CallSchema = SchemaFactory.createForClass(Call);
