/* eslint-disable no-console */
const { dispatchWorkflow } = require("./dispatch");
const auth = process.env.GITHUB_TOKEN;
const owner = "manscaped-dev";
const repo = "manscaped-5-portal";
const workflow_id = ".github/workflows/run-cypress.yml";
const ref = process.env.BRANCH || "dev";

dispatchWorkflow({ auth, owner, repo, workflow_id, ref }).catch(console.error);
