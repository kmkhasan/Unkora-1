import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { StockMovementType } from '@unkora/database';

export class AdjustStockDto {
  @IsString()
  productId: string;

  @IsEnum(StockMovementType)
  type: StockMovementType;

  @IsInt()
  quantity: number; // positive = add, negative = remove

  @IsOptional()
  @IsString()
  note?: string;
}
