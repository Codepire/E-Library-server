import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { RolesMaster } from './roles_master.entity';

@Entity()
export class User {
    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @ManyToOne(() => RolesMaster, (rolesMaster) => rolesMaster.users)
    role: RolesMaster;
}
