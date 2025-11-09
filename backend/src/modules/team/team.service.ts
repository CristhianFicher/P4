import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamMember } from './team-member.entity';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(TeamMember) private repo: Repository<TeamMember>) {}

  async list() { return this.repo.find({ order: { name: 'ASC' } }); }

  async get(id: string) {
    const m = await this.repo.findOne({ where: { id } });
    if (!m) throw new HttpException('TEAM_MEMBER_NOT_FOUND', HttpStatus.NOT_FOUND);
    return m;
  }

  async create(dto: CreateTeamDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.CONFLICT);
    if (new Date(dto.certificationExpiry) < new Date())
      throw new HttpException('CERT_EXPIRED', HttpStatus.BAD_REQUEST);
    if (new Date(dto.hiredAt) > new Date())
      throw new HttpException('HIRE_DATE_IN_FUTURE', HttpStatus.BAD_REQUEST);

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateTeamDto) {
    const m = await this.get(id);
    if (dto.email && dto.email !== m.email) {
      const exists = await this.repo.findOne({ where: { email: dto.email } });
      if (exists) throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.CONFLICT);
    }
    Object.assign(m, dto);
    return this.repo.save(m);
  }

  async remove(id: string) {
    const m = await this.get(id);
    if (m.active) throw new HttpException('CANNOT_DELETE_ACTIVE_MEMBER', HttpStatus.BAD_REQUEST);
    await this.repo.delete(id);
    return { deleted: true };
  }
}

