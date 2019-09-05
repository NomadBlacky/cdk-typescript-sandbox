import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import patterns = require("@aws-cdk/aws-ecs-patterns");
import iam = require("@aws-cdk/aws-iam");
//import route53 = require("@aws-cdk/aws-route53");

export class MyAppStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "ExampleVPC", {
            maxAzs: 2
        });

        const cluster = new ecs.Cluster(this, "MyAppCluster", {
            vpc: vpc
        });

        new patterns.LoadBalancedFargateService(this, "MyFagateService", {
            cluster: cluster,
            cpu: 256,
            memoryLimitMiB: 512,
            desiredCount: 1,
            image: ecs.ContainerImage.fromRegistry('nginx'),
            publicLoadBalancer: true,
            containerPort: 80,
            // domainName: 'cdk-typescript-sandbox.nomadblacky.dev.',
            // domainZone: route53.HostedZone.fromHostedZoneId(this, 'MyZone', 'xxxxxxxx')
        });

        const role = new iam.Role(this, "MyRole", {
            assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonEC2RoleforSSM")
            ]
        });

        const ec2Instance = new ec2.Instance(this, "MyEC2Instance", {
            vpc: vpc,
            instanceType: new ec2.InstanceType("t2.micro"),
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
                edition: ec2.AmazonLinuxEdition.STANDARD,
                virtualization: ec2.AmazonLinuxVirt.HVM,
                storage: ec2.AmazonLinuxStorage.EBS
            }),
            role: role
        });

        ec2Instance.addUserData(
            "#!/bin/bash",
            "sudo yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm",
            "sudo systemctl start amazon-ssm-agent"
        );
    }
}
