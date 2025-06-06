import { getEnv } from "@Common/utils";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { get } from "lodash";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (configService:ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true,
            logging:true
        }),
        inject: [ConfigService],
    })],
    providers: [],
    exports: [],
})
export class DatabaseModule {}