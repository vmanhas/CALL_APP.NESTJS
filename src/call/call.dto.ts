// call.dto.ts
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

// DTO (Data Transfer Object) for creating a new Call record
export class CreateCallDto {
  // Validation decorators to ensure 'userName' is a non-empty string
  @IsString()
  @IsNotEmpty()
  userName: string;

  // Validation decorators to ensure 'phoneNumber' is a non-empty string
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  // Validation decorators to ensure 'callType' is a non-empty string
  @IsString()
  @IsNotEmpty()
  callType: string; // Incoming, Outgoing, Missed, Rejected

  // Validation decorators to ensure 'callDuration' is a non-negative integer
  @IsInt()
  @Min(0)
  callDuration: number; // in seconds

  // Validation decorators to ensure 'numberOfCalls' is a positive integer
  @IsInt()
  @Min(1)
  numberOfCalls: number;
}
