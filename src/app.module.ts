import { Module } from '@nestjs/common';
import { SearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [SearchModule],
})
export class AppModule {}
