#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NextJsEbookBackendStack } from '../lib/back-end-stack';

const app = new cdk.App();

// Environment variables for AWS account and region
const awsAccount = process.env.CDK_DEFAULT_ACCOUNT;
const awsRegion = process.env.CDK_DEFAULT_REGION;

if (!awsAccount || !awsRegion) {
  throw new Error('AWS account and region must be specified via CDK_DEFAULT_ACCOUNT and CDK_DEFAULT_REGION environment variables');
}

new NextJsEbookBackendStack(app, 'NextJsEbookBackendStack', {
  // Using environment variables for account and region
  env: {
    account: awsAccount,
    region: awsRegion,
  },
  
  // You can add additional props here as needed
  description: 'Backend infrastructure stack for the NextJS ebook application',
  
  // Optional: Add tags for better resource management
  tags: {
    Environment: process.env.ENVIRONMENT || 'development',
    Project: 'nextjs-ebook',
    ManagedBy: 'CDK'
  }
});

app.synth();
