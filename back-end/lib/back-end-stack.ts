// back-end-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class NextJsEbookBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ebookSubscribersTable = new dynamodb.Table(this, "NextJsEbookSubscribersTable", {
      partitionKey: { name: "email", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "timestamp", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      timeToLiveAttribute: "ttl"
    });

    const apiFunction = new nodejs.NodejsFunction(this, "NextJsEbookAPIFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: __dirname + "/lambda/api/index.ts",
      handler: "handler",
      architecture: lambda.Architecture.ARM_64,
      environment: {
        EBOOK_SUBSCRIBERS_TABLE: ebookSubscribersTable.tableName
      }
    });

    ebookSubscribersTable.grantReadWriteData(apiFunction);

    const restApi = new apigateway.LambdaRestApi(this, "NextJsEbookAPI", {
      handler: apiFunction,
      proxy: true
    });

    new cdk.CfnOutput(this, "APIGatewayURL", {
      value: restApi.url,
      description: "API Gateway endpoint URL"
    });
  }
}
