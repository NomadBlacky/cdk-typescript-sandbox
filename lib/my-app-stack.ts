import { HelloCdkLib } from "@nomadblacky/hello-cdk-lib";
import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { DatadogMonitor } from "@nomadblacky/cdk-datadog-resources";

export class MyAppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new HelloCdkLib(this, "HelloCdkLib", {
      bucketName: "nomadblacky-cdk-typescript-sandbox",
    });

    new DatadogMonitor(this, "TestMonitor", {
      datadogCredentials: {
        apiKey: process.env.DATADOG_API_KEY || "DATADOG_API_KEY",
        applicationKey: process.env.DATADOG_APP_KEY || "DATADOG_APP_KEY",
      },
      query: "avg(last_1h):sum:system.cpu.system{host:host0} > 100",
      type: "query alert",
      name: "Test Monitor",
      options: {
        thresholds: {
          critical: 100,
          warning: 80,
          oK: 90,
        },
        notifyNoData: true,
        evaluationDelay: 60,
      },
    });
  }
}
