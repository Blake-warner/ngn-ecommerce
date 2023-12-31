import { DataSource } from 'typeorm';
import { VerifyEmail } from './verify-email.entity';

export const verifyEmailProviders = [
  {
    provide: 'VERIFY-EMAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(VerifyEmail),
    inject: ['DATA_SOURCE'],
  },
];