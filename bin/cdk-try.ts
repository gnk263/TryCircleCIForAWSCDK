#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkTryStack } from '../lib/cdk-try-stack';

const app = new cdk.App();
new CdkTryStack(app, 'CdkTryStack');
