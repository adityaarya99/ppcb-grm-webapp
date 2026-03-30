import { IsOptional, IsString, IsBoolean, MaxLength } from 'class-validator';

export class UpdateGroupTypeDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
