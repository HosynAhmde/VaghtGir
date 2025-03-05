import { is } from '@Common/utils';

export const isProd = is('production');
export const isDev = is('development');
export const isStaging = process.env['NODE_ENV'] === 'staging';
export const isTest = is('testing');
