# github-discovery
A discovery mechanism for github repos. Helps people find repos to contribute to and helps repos be discovered.

[![Build Status](https://travis-ci.org/olivif/github-discovery.svg?branch=master)](https://travis-ci.org/olivif/github-discovery)
[![Coverage Status](https://codecov.io/github/olivif/github-discovery/coverage.svg?precision=2)](https://codecov.io/github/olivif/github-discovery)

## Setup locally

The package is not yet on npm, so you will need to run it locally. To do that, just [fork the repo](https://github.com/olivif/github-discovery#fork-destination-box) to get a copy and run npm link to get access to the bin scripts. 

Then you should have access to the gd task.    

Run `--help` to see a list of all supported args currently.

```sh
$ gd --help

  Usage: github-discovery [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -t, --topic <n>        filter on a topic
    -l, --language <l>     filter repos by language
    -f, --forksIncluded    include forks in the search
    -r, --recentlyUpdated  only include repos that have been updated recently (last month)
    -m, --mitLicenseOnly   only include repos that have an MIT license
    -c, --contribute       only include repos that have contributing documentation
    -n, --notDeprecated    exclude repos which might be deprecated
```
### Example

```sh
$ gd --topic node --language javascript -f -r -m -c -n
``` 

You should see some info about your query
```
Specified filters:
Language : javascript
Topic : node
ForksIncluded : true
RecentlyUpdated : true
MitLicenseOnly : true
Contribute : true
NotDeprecated : true
Query = node+language:javascript+fork:true+pushed:>2015-10-20+MIT license in:readme+contribute in:readme+NOT deprecated
```

And then a list of 30 odd results. 

![image](https://cloud.githubusercontent.com/assets/7736961/11918473/22fadb18-a733-11e5-8a18-f4b1af1d8961.png)

## How it works

Based on GitHub's [advanced search API](https://help.github.com/articles/searching-repositories/), github-discovery finds a list of interesting repos for you! 

## How to contribute

We would love to get contributors on the project (despite being in the very early stages of it!). 
You can read [CONTRIBUTING.md](https://github.com/olivif/github-discovery/blob/master/CONTRIBUTING.md).  
You can also see a list of the working ideas [here](https://github.com/olivif/github-discovery/blob/master/ideas.md). 

#### Code style

#### Testing
We are using mocha and should for testing. And codecov for coverage tracking. All PRs must have at least the coverage currently on master.  

