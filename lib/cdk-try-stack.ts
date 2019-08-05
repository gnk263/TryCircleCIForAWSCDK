import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import cdk = require('@aws-cdk/core');

export class CdkTryStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Lambda
    const testLambda = new lambda.Function(this, 'TestLambda', {
      code: lambda.Code.asset('src/lambda'),
      handler: 'app.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      functionName: 'cdk-test-function',
    });

    const api = new apigateway.RestApi(this, 'TestCdkApi', {
      restApiName: 'TestCdkApi',
    });

    const integration = new apigateway.LambdaIntegration(testLambda, {
      proxy: true,
    });

    const resource = api.root.addResource('test');
    resource.addMethod('GET', integration);
  }
}

const app = new cdk.App();
new CdkTryStack(app, 'CdkTryStack');
app.synth();
