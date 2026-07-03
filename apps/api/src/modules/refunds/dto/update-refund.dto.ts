import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RefundStatus } from '@unkora/database';

export class UpdateRefundDto {
  @IsEnum(RefundStatus) status: RefundStatus;
  @IsOptional() @IsString() adminNote?: string;
}
