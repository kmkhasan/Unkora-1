import { ApiPropertyOptional } from '@nestjs/swagger';
import { BookSubmissionStatus } from '@unkora/database';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSubmissionDto {
  @ApiPropertyOptional({ enum: BookSubmissionStatus })
  @IsOptional()
  @IsEnum(BookSubmissionStatus)
  status?: BookSubmissionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adminNote?: string;
}
