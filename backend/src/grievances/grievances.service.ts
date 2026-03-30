import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grievance } from './grievance.entity';
import { CreateGrievanceDto } from './dto/create-grievance.dto';

@Injectable()
export class GrievancesService {
  constructor(
    @InjectRepository(Grievance)
    private grievanceRepository: Repository<Grievance>,
  ) { }

  async submit(createGrievanceDto: CreateGrievanceDto, fileNames?: string[]) {

    const grievanceNo = 'GRV-' + Date.now();

    const grievance = this.grievanceRepository.create({
      grievance_no: grievanceNo,
      form_type: createGrievanceDto.form_type,
      source_of_complaint: createGrievanceDto.source_of_complaint,
      pollution_types: createGrievanceDto.pollution_types,
      complaint_subject: createGrievanceDto.complaint_subject,
      board_reference_no: createGrievanceDto.board_reference_no,
      date_of_receipt: createGrievanceDto.date_of_receipt,
      filed_by_type: createGrievanceDto.filed_by_type,
      complainant_name: createGrievanceDto.complainant_name,
      complainant_address: createGrievanceDto.complainant_address,
      complainant_district_id: createGrievanceDto.complainant_district_id,
      complainant_pincode: createGrievanceDto.complainant_pincode,
      complainant_contact_no: createGrievanceDto.complainant_contact_no,
      complainant_occupation: createGrievanceDto.complainant_occupation,
      group_type: createGrievanceDto.group_type,
      group_nodal_name: createGrievanceDto.group_nodal_name,
      group_nodal_contact_no: createGrievanceDto.group_nodal_contact_no,
      group_address: createGrievanceDto.group_address,
      industry_name: createGrievanceDto.industry_name,
      site_address: createGrievanceDto.site_address,
      site_district_id: createGrievanceDto.site_district_id,
      site_pincode: createGrievanceDto.site_pincode,
      complaint_details: createGrievanceDto.complaint_details,
      media_file: fileNames && fileNames.length
        ? JSON.stringify(fileNames)
        : undefined, status: 'Submitted',
    });

    const savedData = await this.grievanceRepository.save(grievance);
    console.log('Grievance saved with ID:', savedData);
    return {
      message: 'Grievance submitted successfully',
      grievance_no: grievanceNo,
    };
  }

  async getById(id: number) {
    const grievance = await this.grievanceRepository.findOne({
      where: { id: id },
    });

    if (!grievance) {
      throw new NotFoundException('Grievance not found');
    }

    return grievance;
  }
   async getList() {
    const grievances = await this.grievanceRepository.find({
      select: ['id', 'grievance_no', 'complaint_subject', 'filed_by_type', 'complainant_name', 'created_at', 'status'],
      order: { created_at: 'DESC' },
    });

    if (!grievances) {
      throw new NotFoundException('No grievances found');
    }
 
    return grievances;
  }
} 