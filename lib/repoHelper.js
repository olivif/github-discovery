const chalk = require("chalk");

module.exports = {
    printRepo: printRepo
};

function printRepo(repo) {
    console.log();
    console.log(
        chalk.cyan(repo.full_name) + " *" +
        chalk.yellow(repo.stargazers_count) + " w" +
        chalk.magenta(repo.watchers_count) + " f" +
        chalk.green(repo.forks_count));
    console.log(repo.url);
}