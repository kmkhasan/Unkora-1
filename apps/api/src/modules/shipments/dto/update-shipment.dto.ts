import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ShipmentStatus } from '@unkora/database';

export class UpdateShipmentDto {
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  trackingUrl?: string;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;

  @IsOptional()
  @IsDateString()
  estimatedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
