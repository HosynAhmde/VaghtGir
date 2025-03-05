export const SmsProviders = {
  Kavenegar: 'kavenegar',
  Rahyab: 'rahyab',
} as const;

export type SmsProviders = (typeof SmsProviders)[keyof typeof SmsProviders];
