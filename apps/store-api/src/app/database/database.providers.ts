import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';
import { Category } from '../categories/category.entity';
import { Attribute } from '../attributes/attribute.entity';
import { User } from '../users/user.entity';
import { VerifyEmail } from '../auth/verify-email/verify-email.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: '1Yz6N7H6l0K5ABq',
        database: 'ngn_ecommerce',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
            Product,
            Category,
            Attribute,
            User,
            VerifyEmail
        ],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];