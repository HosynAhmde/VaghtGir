import { SmsProviders } from '../providers.constant';
import { KavenegarProvider } from './kavenegar.provider';
import { RahyabProvider } from './rahyab.provider';

export const providers: Record<
  SmsProviders,
  typeof KavenegarProvider | typeof RahyabProvider
> = {
  [SmsProviders.Kavenegar]: KavenegarProvider,
  [SmsProviders.Rahyab]: RahyabProvider,
};
