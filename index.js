/* eslint-disable no-console */
const { dispatchWorkflow } = require("./src/dispatch");

module.exports = {
  onSuccess: async ({ constants, utils, inputs }) => {
    const siteName = process.env.SITE_NAME;
    // unique deploy url
    const deployUrl = process.env.DEPLOY_URL;
    // preview, branch, or production deploy url
    const deployedUrl = process.env.DEPLOY_PRIME_URL;
    const commitRef = process.env.COMMIT_REF;
    const branch = process.env.BRANCH;
    const headBranch = process.env.HEAD;

    // we probably want to test the prime url
    console.log("Deployed URL %s", deployedUrl);
    console.log("Deploy URL %s", deployUrl);

    // if this plugin is missing something, report and error
    // https://docs.netlify.com/configure-builds/build-plugins/create-plugins/#error-reporting
    const auth = process.env.GITHUB_TOKEN;

    if (!auth) {
      return utils.build.failPlugin("Missing env variable GITHUB_TOKEN");
    }

    try {
      const owner = inputs.owner;
      const repo = inputs.repo;
      const workflow_id = inputs.workflow;
      const ref = inputs.branch || headBranch || branch || "dev";

      // inputs the triggered workflow receives
      const workflowInputs = {
        siteName,
        deployedUrl,
        deployUrl,
        commit: commitRef,
      };

      const dispatchInput = { auth, owner, repo, workflow_id, ref };

      await dispatchWorkflow(dispatchInput, workflowInputs);
    } catch (error) {
      return utils.build.failPlugin(error.message, { error });
    }
  },
};
