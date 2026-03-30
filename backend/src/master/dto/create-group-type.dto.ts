import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class CreateGroupTypeDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean = true;
}
