import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { AdjustmentReason } from '@unkora/database';

export class StockAdjustmentDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  quantity: number;

  @IsEnum(AdjustmentReason)
  reason: AdjustmentReason;

  @IsOptional()
  @IsString()
  note?: string;
}
