import { BaseEntity } from '#/common/entities/base-entity.entity.js';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PollOptionEntity } from './poll-option.entity.js';
import { PollEntity } from './poll.entity.js';
import { UserEntity } from './user.entity.js';

@Entity('votes')
export class VoteEntity extends BaseEntity {
  @ManyToOne(() => PollOptionEntity, (option) => option.votes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pollId' })
  option: PollOptionEntity | null;

  @Column()
  optionId: string;

  // Опционально: связь с опросом (полезно для проверки, голосовал ли уже юзер в этом Poll)
  @ManyToOne(() => PollEntity, (poll) => poll.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pollId' })
  poll: PollEntity | null;

  @Column()
  pollId: string;

  @ManyToOne(() => UserEntity, (user) => user.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity | null;

  @Column()
  userId: string;
}
