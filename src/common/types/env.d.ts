namespace NodeJS {
    interface ProcessEnv {
        //Application
        PORT: number
        //Database
        DB_PORT: number
        DB_NAME: string
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        //secrets
        COOKIE_SECRET: string
        OTP_TOKEN_SECRET: string
        ACCESS_TOKEN_SECRET: string
        ACCESS_TOKEN_EXPIRATION: string | number
        REFRESH_TOKEN_SECRET: string
        REFRESH_TOKEN_EXPIRATION: string | number
        //kavenegar
        SMS_KAVENEGAR_API_KEY: string
        SMS_KAVENEGAR_API_VERSION: string
        SMS_KAVENEGAR_OTP_TEMPLATE: string

    }
}