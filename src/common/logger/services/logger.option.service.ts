import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Params } from 'nestjs-pino';
import { ENUM_APP_ENVIRONMENT } from '@app/enums/app.enum';
import { HelperDateService } from '@common/helper/services/helper.date.service';
import { LOGGER_SENSITIVE_FIELDS } from '@common/logger/constants/logger.constant';
import { IRequestApp } from '@common/request/interfaces/request.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerOptionService {
    private readonly env: ENUM_APP_ENVIRONMENT;
    private readonly name: string;
    private readonly version: string;

    private readonly debugEnable: boolean;
    private readonly debugLevel: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService
    ) {
        this.env = this.configService.get<ENUM_APP_ENVIRONMENT>('app.env');
        this.name = this.configService.get<string>('app.name');
        this.version = this.configService.get<string>('app.version');

        this.debugEnable = this.configService.get<boolean>('debug.enable');
        this.debugLevel = this.configService.get<string>('debug.level');
    }

    createOptions(): Params {
        return {
            pinoHttp: {
                level: this.debugEnable ? this.debugLevel : 'silent',
                formatters: {
                    level: (label: string) => ({
                        level: label.toUpperCase(),
                        severity: this.mapLevelToSeverity(label),
                    }),
                    log: object => {
                        const today = this.helperDateService.create();

                        const formatted: { [key: string]: any } = {
                            ...object,
                            timestamp: today.valueOf(),
                            iso: this.helperDateService.formatToIso(today),
                            labels: {
                                name: this.name,
                                env: this.env,
                                version: this.version,
                            },
                        };

                        if (!formatted.message && formatted.msg) {
                            formatted.message = formatted.msg;
                        }

                        if (formatted.msg) {
                            delete formatted.msg;
                        }

                        return formatted;
                    },
                },
                messageKey: 'message',
                timestamp: false,
                base: null,
                customProps: (req: Request, _res: Response) => ({
                    context: 'HTTP',
                    requestId: req.id || uuidv4(),
                }),
                redact: {
                    paths: [
                        ...LOGGER_SENSITIVE_FIELDS.map(field =>
                            field.includes('-') || field.includes('_')
                                ? `req.body["${field}"]`
                                : `req.body.${field}`
                        ),
                        ...LOGGER_SENSITIVE_FIELDS.map(field =>
                            field.includes('-') || field.includes('_')
                                ? `req.headers["${field}"]`
                                : `req.headers.${field}`
                        ),
                    ],
                    remove: true,
                },
                serializers: {
                    req: (request: IRequestApp) => ({
                        id: request.id,
                        method: request.method,
                        url: request.url,
                        path: request.path,
                        route: request.route?.path,
                        parameters: request.params,
                        query: request.query,
                        headers: request.headers,
                        body: request.body,
                        ip: request.ip,
                        user: (request as any).user?.user,
                        session: (request as any).user?.session,
                        userAgent: request.headers['user-agent'],
                        referer: request.headers.referer,
                    }),
                    res: (response: Response) => {
                        const headers = response.headersSent
                            ? response.getHeaders()
                            : {};

                        return {
                            httpCode: response.statusCode,
                            headers,
                        };
                    },
                    err: (error: Error) => ({
                        type: error.name,
                        message: error.message,
                        code: (error as any).statusCode,
                        stack:
                            this.env === ENUM_APP_ENVIRONMENT.PRODUCTION
                                ? undefined
                                : error.stack,
                    }),
                },
                transport:
                    this.env === ENUM_APP_ENVIRONMENT.LOCAL
                        ? {
                              target: 'pino-pretty',
                              options: {
                                  colorize: true,
                                  levelFirst: true,
                                  translateTime: 'SYS:standard',
                              },
                          }
                        : undefined,
                autoLogging: false,
            },
        };
    }

    private mapLevelToSeverity(level: string): string {
        const mapping: Record<string, string> = {
            trace: 'TRACE',
            debug: 'DEBUG',
            info: 'INFO',
            warn: 'WARNING',
            error: 'ERROR',
            fatal: 'CRITICAL',
        };

        return mapping[level.toLowerCase()] || 'DEFAULT';
    }
}
