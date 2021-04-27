import { HelloCdkLib } from "@nomadblacky/hello-cdk-lib";
import { Construct, Stack, StackProps } from "@aws-cdk/core";

export class MyAppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new HelloCdkLib(this, "HelloCdkLib", {
      bucketName: "nomadblacky-cdk-typescript-sandbox",
    });
  }
}
