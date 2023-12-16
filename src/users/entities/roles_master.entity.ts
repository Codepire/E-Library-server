import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RolesMaster {
    @PrimaryColumn()
    role: string;

    @OneToMany(() => User, (user) => user.role)
    users: User;
}
