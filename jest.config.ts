import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testRegex: '/tests/.*.ts$',
    preset: 'ts-jest',
    testEnvironment: 'node',
};

export default config;
