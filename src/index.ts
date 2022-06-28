import { AppDataSource } from './data-source';
import { User } from './entity/User';

AppDataSource.initialize()
    .then(async () => {
        console.log('Inserting a new user into the database...');
        const user = new User();
        user.firstName = 'Timber';
        user.lastName = 'Saw';
        user.age = 25;
        await AppDataSource.manager.save(user);
        console.log('Saved a new user with id: ' + user.id);

        await AppDataSource.manager.softRemove(user);

        console.log(
            'Loaded user after delete: ',
            await AppDataSource.manager.find(User, {
                where: { id: user.id },
                withDeleted: true,
            })
        );

        await AppDataSource.manager.recover(user);

        console.log(
            'Loaded user after recover: ',
            await AppDataSource.manager.find(User, {
                where: { id: user.id },
            })
        );

        AppDataSource.destroy();
    })
    .catch((error) => console.log(error));
