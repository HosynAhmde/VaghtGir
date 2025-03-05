
import { isBoolean, isNull } from './guard.util';

export const generateCacheKey = (...keys: (number | string)[]) =>
  keys.join(':');

export const toPlain = <T = any>(data: any): T =>
  JSON.parse(JSON.stringify(data));

export const required = <T>(
  value: Nullish | T,
  name: string = 'value',
): NonNullable<T> => {
  if (isNull(value)) throw Error(`${name} is required`);
  return value as NonNullable<T>;
};

export type EnvironmentVariable<T extends string = string> = T | undefined;
export type Nullish = null | undefined;

type NodeEnv<T extends string = never> = EnvironmentVariable<
  T | 'development' | 'production' | 'staging'
>;

export const is = <T extends string>(value: NodeEnv<T>): boolean =>
  process.env['NODE_ENV'] === value;

export type EnvKey = 'NODE_ENV';

/**
 * check if value is null, undefined or empty string or array
 */
export const isNullOrEmpty = <T extends any[] | string>(
  x: Nullish | T | '' | [],
): x is Nullish | (T extends any[] ? [] : '') => isNull(x) || x.length === 0;

export const fallback = <T, U = T>(value: T, defaultValue: U): T | U =>
  isNull(value) ? defaultValue : value;

export const fallbackString = <T = string>(
  value: Nullish | string,
  defaultValue: T,
): T | string => (isNullOrEmpty(value) ? defaultValue : value);

/**
 * give NODE_ENV value or given fallback value
 */

export function getEnv<TKey extends string = string>(
  key: TKey,
): Nullish | string;
export function getEnv<
  TKey extends string = string,
  TValue extends Nullish | string = string,
>(key: TKey, defaultValue: TValue): TValue;

export function getEnv<
  TKey extends string = string,
  TValue extends Nullish | string = string,
>(key: TKey, defaultValue?: TValue): Nullish | TValue {
  const value = process.env[key];
  return fallbackString(value, defaultValue) as TValue;
}

/**
 * returns NODE_ENV value or given fallback value
 */
export const getNodeEnv = <T extends string = never>(
  defaultValue?: T,
): NodeEnv<T> => getEnv<'NODE_ENV', NodeEnv<T>>('NODE_ENV', defaultValue);

/**
 * parse environment to a boolean or throw error
 * if env does not exist, returns fallback value.
 */
export function getBooleanEnv<TKey extends string = string>(
  key: TKey,
  defaultValue?: boolean,
): boolean | undefined {
  const value = getEnv(key);
  if (isNullOrEmpty(value)) return defaultValue;

  try {
    const boolean = JSON.parse(value);
    if (!isBoolean(boolean)) throw Error('Not a boolean');
    return boolean;
  } catch {
    throw Error(`Invalid boolean environment for ${key}, received ${value}`);
  }
}

/**
 * returns NODE_ENV value or given fallback otherwise throws
 */
export const getRequiredEnv = <TKey extends string = string>(
  envKey: TKey,
): string => required(getEnv(envKey, null), envKey);

