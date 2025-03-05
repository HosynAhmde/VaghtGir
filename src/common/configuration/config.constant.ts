export const ConfigNamespace = {
    Application: 'application',
    Auth: 'auth',
    Redis: 'redis',
    Cors: 'cors',
    Database: 'database',
    Sms: 'sms',
    Sentry: 'sentry',
    Otp: 'otp',
    S3: 's3',
    Payment: 'payment',
  } as const;
  
  export type Namespace = (typeof ConfigNamespace)[keyof typeof ConfigNamespace];
  