import type { EnvOptions } from 'tnp/src';
import baseEnv from '../../env';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  build: {
    ...baseEnv.build,
  },
  paths: {
    googleApiKey: 'test-key',
    googleMapsApiKey: 'test-maps-key',
  }
};
export default env;
