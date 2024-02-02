import { Module } from '@nestjs/common';
import { ProductsModule } from './tasks/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './middleware/multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessInterceptor } from './helper/succes.intercepter';
import { UserAuthModule } from './user-auth/user-auth.module';

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
    UserAuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
  ],
})
export class AppModule {}
