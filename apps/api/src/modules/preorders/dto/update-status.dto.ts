import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PreorderOrderStatus } from '@unkora/database';

export class UpdatePreorderStatusDto {
  @IsEnum(PreorderOrderStatus)
  status: PreorderOrderStatus;

  @IsOptional() @IsString()
  note?: string;
}
