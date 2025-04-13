// back-end-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class NextJsEbookBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the DynamoDB table for ebook subscribers
    const ebookSubscribersTable = new dynamodb.Table(this, "NextJsEbookSubscribersTable", {
      partitionKey: { name: "email", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "timestamp", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Use RETAIN for production
      timeToLiveAttribute: "ttl"
    });

    // Define the Lambda function for handling subscriptions
    const subscribeFunction = new nodejs.NodejsFunction(this, "NextJsEbookSubscribeFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: __dirname + "/lambda/subscribe/index.ts",
      handler: "handler",
      architecture: lambda.Architecture.ARM_64,
      bundling: {
        externalModules: ["aws-lambda", "aws-sdk"]
      },
      environment: {
        EBOOK_SUBSCRIBERS_TABLE: ebookSubscribersTable.tableName
      }
    });

    // Grant the Lambda function permissions to access the DynamoDB table
    ebookSubscribersTable.grantReadWriteData(subscribeFunction);

    // Define the Lambda function URL resource
    const subscribeFunctionUrl = subscribeFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });

    // Define CloudFormation outputs
    new cdk.CfnOutput(this, "subscribeFunctionUrl", {
      value: subscribeFunctionUrl.url,
      description: "URL for the Next.js Ebook subscription endpoint"
    });

    new cdk.CfnOutput(this, "ebookSubscribersTableName", {
      value: ebookSubscribersTable.tableName,
      description: "DynamoDB table name for Next.js Ebook subscribers"
    });
  }
}
