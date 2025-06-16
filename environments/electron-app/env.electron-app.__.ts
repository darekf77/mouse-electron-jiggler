import type { EnvOptions } from 'tnp/src';
import baseEnv from '../../env';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  release: {
    staticPagesCustomRepoUrl:
      'git@github.com:darekf77/mouse-electron-jiggler-versions.git',
  },
};
export default env;
