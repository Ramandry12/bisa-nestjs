import { Module } from '@nestjs/common';
import { ProductsModule } from './tasks/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './middleware/multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductsModule,
    MulterModule.register(multerConfig),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-proud-smoke-a1tb4ww6-pooler.ap-southeast-1.postgres.vercel-storage.com',
      port: 5432,
      username: 'default',
      password: 'vWD9TjhnV7cA',
      database: 'verceldb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
