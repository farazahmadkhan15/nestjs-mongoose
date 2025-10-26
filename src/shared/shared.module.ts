import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'

import { configModuleOptions } from './configs/module-options'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { AppLoggerModule } from './logger/logger.module'

@Module({
  exports: [AppLoggerModule],
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isLocal = configService.get<string>('env') !== 'production'

        return {
          autoIndex: isLocal, // enable auto index in dev only
          connectTimeoutMS: 10000,
          retryWrites: true,
          // Optional: helpful debugging and stability settings
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          ssl: true,
          tls: true,
          uri: configService.get<string>('database.uri'),
          w: 'majority',
        }
      },
    }),
    AppLoggerModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class SharedModule {}
