import {
    BeforeRecover,
    BeforeSoftRemove,
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @DeleteDateColumn({ nullable: true })
    deletedOn: Date;

    @Column({ nullable: true })
    deletedBy: number;

    @BeforeSoftRemove()
    beforeSoftRemove() {
        // TODO: This does not work
        this.deletedBy = 1;
    }

    @BeforeRecover()
    updateStatus() {
        // TODO: This does not work
        this.deletedBy = 2;
    }
}
