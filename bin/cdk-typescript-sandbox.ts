#!/usr/bin/env node
import cdk = require("@aws-cdk/core");
import { MyAppStack } from "../lib/my-app-stack";

const app = new cdk.App();
new MyAppStack(app, "MyAppStack", {
  tags: {
    project: "cdk-typescript-sandbox",
  },
});
