#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkTypescriptSandboxStack } from '../lib/cdk-typescript-sandbox-stack';

const app = new cdk.App();
new CdkTypescriptSandboxStack(app, 'CdkTypescriptSandboxStack');