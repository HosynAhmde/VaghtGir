import { getEnv, getRequiredEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.S3, () => ({
  ssl: getEnv('MINIO_SSL') === 'true',
  host: getEnv('MINIO_HOST', 'localhost'),
  port: getEnv('MINIO_PORT'),
  credentials: {
    accessKeyId: getRequiredEnv('MINIO_ROOT_USER'),
    secretAccessKey: getRequiredEnv('MINIO_ROOT_PASSWORD'),
  },
  region: getEnv('MINIO_REGION', 'us-east-1'),
  bucket: getEnv('MINIO_ASSET_BUCKET', 'media'),
}));
