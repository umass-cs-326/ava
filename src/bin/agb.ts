#!/usr/bin/env node

// CLI for building the auto-grader bundle
// Usage: node bin/agb.js

import { AutoGraderBuilder } from '../lib/autograder/AutoGraderBuilder.js';

AutoGraderBuilder.getInstance().build();
