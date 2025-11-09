import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRevisionDto, UpdateRevisionDto } from './dto';
import { Revision } from './revision.entity';

@Injectable()
export class RevisionsService {
  constructor(@InjectRepository(Revision) private repo: Repository<Revision>) {}

  async list() { return this.repo.find({ order: { scheduledDate: 'DESC' } }); }

  async get(id: string) {
    const rev = await this.repo.findOne({ where: { id } });
    if (!rev) throw new HttpException('REVISION_NOT_FOUND', HttpStatus.NOT_FOUND);
    return rev;
  }

  async create(dto: CreateRevisionDto) {
    const date = new Date(dto.scheduledDate);
    if (date < new Date()) throw new HttpException('SCHEDULE_IN_PAST', HttpStatus.BAD_REQUEST);
    if (!/^[A-Z]{3}-?[0-9A-Z]{4}$/i.test(dto.licensePlate))
      throw new HttpException('INVALID_LICENSE_PLATE', HttpStatus.BAD_REQUEST);
    if (dto.status === 'concluida' && !dto.notes)
      throw new HttpException('FINISH_REQUIRES_NOTES', HttpStatus.BAD_REQUEST);

    const entity = this.repo.create({ ...dto, scheduledDate: date });
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateRevisionDto) {
    const rev = await this.get(id);
    if (rev.status === 'concluida' && dto.status && dto.status !== 'concluida')
      throw new HttpException('CANNOT_REOPEN_FINISHED', HttpStatus.BAD_REQUEST);
    if (dto.scheduledDate && new Date(dto.scheduledDate) < new Date())
      throw new HttpException('SCHEDULE_IN_PAST', HttpStatus.BAD_REQUEST);

    Object.assign(rev, { ...dto, scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : rev.scheduledDate });
    return this.repo.save(rev);
  }

  async remove(id: string) {
    const rev = await this.get(id);
    if (rev.scheduledDate < new Date())
      throw new HttpException('CANNOT_DELETE_PAST_REVISION', HttpStatus.BAD_REQUEST);
    await this.repo.delete(id);
    return { deleted: true };
  }
}

