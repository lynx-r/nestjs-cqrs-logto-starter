import { BaseEntity } from '#/common/entities/base-entity.entity.js';
import { Entity, OneToMany } from 'typeorm';
import { PollEntity } from './poll.entity.js';
import { VoteEntity } from './vote.entity.js';

@Entity('users')
export class UserEntity extends BaseEntity {
  @OneToMany(() => PollEntity, (poll) => poll.author)
  polls: PollEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.user)
  votes: VoteEntity[];
}
