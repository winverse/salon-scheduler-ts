import { Module } from "@nestjs/common";
import { ConfigModule } from "./provider/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    
  }), ConfigModule],
})
export class AppModule {}
