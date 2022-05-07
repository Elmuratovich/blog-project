import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { RolesGuard } from './guards/roles.guard';
import { LocalAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1000000s' }
            })
        })
    ],
    providers: [AuthService, RolesGuard, LocalAuthGuard, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
