import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AuctionStatus } from '@unkora/database';

export class CreateAuctionDto {
  @IsString()
  productId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  startingPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  reservePrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  bidIncrement?: number;

  @IsDateString()
  startsAt: string;

  @IsDateString()
  endsAt: string;

  @IsOptional()
  @IsEnum(AuctionStatus)
  status?: AuctionStatus;

  @IsOptional()
  @IsString()
  featuredImage?: string;
}
