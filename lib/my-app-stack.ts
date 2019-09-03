import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");

export class MyAppStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "ExampleVPC", {
            maxAzs: 2
        });

        const cluster = new ecs.Cluster(this, "MyAppCluster", {
            vpc: vpc
        });
    }
}
