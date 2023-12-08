#!/usr/bin/env node

import { nodeTestRunnerTap } from "../lib/test-runner-fn.js";

const results = nodeTestRunnerTap(["./tests"]).then((results) => {
  console.log(results);
});