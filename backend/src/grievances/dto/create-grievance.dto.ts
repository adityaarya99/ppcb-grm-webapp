import {
  IsArray,
  ArrayNotEmpty,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGrievanceDto {
  @IsString()
  @IsIn(['CITIZEN', 'official'])
  form_type: string;

  @IsOptional()
  @IsString()
  @IsIn(['Citizen', 'Central Govt.', 'State Govt.', 'Other'])
  source_of_complaint: string;

  @IsString()
@IsIn(['Air', 'Water', 'Noise'])
  pollution_types: string;

  
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^[A-Za-z0-9\s.,&()\-\/]+$/, {
    message: 'Complaint subject contains invalid characters',
  })
  complaint_subject: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  board_reference_no: string;

  @IsOptional()
  @IsDateString()
  date_of_receipt: string;

  @IsString()
  @IsIn(['Individual', 'Group'])
  filed_by_type: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complainant_name: string;

  @IsOptional()
  @IsString()
  complainant_address: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  complainant_district_id: number;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{6}$/, {
    message: 'Complainant pincode must be 6 digits',
  })
  complainant_pincode: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'Complainant contact number must be 10 digits',
  })
  complainant_contact_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complainant_occupation: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  group_type: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  group_nodal_name: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'Group nodal contact number must be 10 digits',
  })
  group_nodal_contact_no: string;

  @IsOptional()
  @IsString()
  group_address: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  industry_name: string;

  @IsString()
  @IsNotEmpty()
  site_address: string;

  @Type(() => Number)
  @IsNumber()
  site_district_id: number;

  @IsString()
  site_pincode: string;

  @IsOptional()
  @IsString()
  complaint_details: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  media_file: string;


}