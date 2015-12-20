# Contributing to github-discovery

Thanks for taking the time to read this and hopefully to contribute to this project! The goal of this project is to help people discover interesting repos. We've all been there, when we want to get involved in a new project or just find some cool code to read on github, and it's hard to discover something. This project aims to solve that, so hopefully it will solve your problem too, not just mine :smile: :fireworks:

## Creating good issues

Here are 6 main labels used in the issues section of the project, along with some guidance on how to create related issues. Make sure you check the current list of open issues, so we don't get duplicates.

* bug :beetle: - describe what you believe is the expected behaviour and how the actual behaviour differs; add any code samples, print screens, output files that might help the investigation and try to investigate yourself first  
* feature :tulip: - describe the new feature, how it would improve the product and what the impact of it would be; engage other github members to get opinions
* enhancement :icecream: -> :ice_cream: - this represents a (usually small) change to an existing feature; similarly to feature, try to describe the value added and engage others
* refactoring :recycle: - code improvements that would help design, readability, testability. great candidates for PRs
* testing :fire: - to prevent fires from starting, we should make a point of testing the product thoroughly; anything that improves the code coverage and confidence in the code is welcome as an issue and a PR
* documentation :scroll: - we want people to feel encouraged to contribute and find it easy to jump into the code and submit PRs, let's keep the docs up to date with every change   

## Coding style

###Require-s 
Keep them const. I also tend to leave a break line between package dependencies and internal dependencies, like below.
```js
const githubSearchRepos = require("github-search-repos");
const chalk = require("chalk");

const utils = require("./../lib/utils");
```
###Strings
Stick to `"` instead of `'` 


###Function style 

```js
function callMe(maybe) {
	console.log("I'm a function.");
}	
```

## Testing
The project uses [mocha](http://mochajs.org/) and [should](https://shouldjs.github.io/) for testing; and [codecov](https://codecov.io) for coverage tracking. Tests get run automatically as part of the CI system, so make sure your changes don't break anything. Also make sure you add tests for all new scenarios: unit, integration and end to end tests. You can find a great article on BDD and testing for node [here](http://webapplog.com/tdd/).  


## Pull requests
First step is to discuss the change on an issue thread in order to make sure everyone is on the same page, it removes unnecessary work. After the change has been agreed to by the community, feel free to fork and make the required changes (don't forget to follow the coding standard and testing practices mentioned above). After you're done, squash your commits into one and submit the PR. Provided everyone is happy, all checks pass (build, tests, code coverage), the PR will get merged in. 



