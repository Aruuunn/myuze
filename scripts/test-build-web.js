const { exit } = require("process");
const { exec } = require("child_process");

const server = exec("PORT=3000 yarn exec http-server packages/web/build");
const cypress = exec("yarn exec  cypress run --headless --browser chrome");

cypress.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

cypress.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

cypress.on("exit", (code) => {
  server.kill();
  exit(code);
});
