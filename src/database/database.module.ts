import { Module } from '@nestjs/common';
import { typeORMConfigProvider } from './providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, typeORMConfigProvider],
})
export class DatabaseModule {}
