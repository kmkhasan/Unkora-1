import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DeliveryBoyStatus } from '@unkora/database';

export class UpdateDeliveryBoyDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  vehicleType?: string;

  @IsOptional()
  @IsEnum(DeliveryBoyStatus)
  status?: DeliveryBoyStatus;
}
