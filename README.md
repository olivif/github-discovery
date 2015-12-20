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
```
### Example

```sh
$ gd --language "javascript" --topic x --forksIncluded --recentlyUpdated

Specified filters:
Language : javascript
Topic : x
ForksIncluded : true
RecentlyUpdated : true
Query = x+language:javascript+fork:true+pushed:>2015-10-20

xtk/X
https://api.github.com/repos/xtk/X

vitalets/x-editable
https://api.github.com/repos/vitalets/x-editable

lapwinglabs/x-ray
https://api.github.com/repos/lapwinglabs/x-ray

markitup/1.x
https://api.github.com/repos/markitup/1.x

Khan/KaTeX
https://api.github.com/repos/Khan/KaTeX

perftools/xhgui
https://api.github.com/repos/perftools/xhgui

[...]

Got 30 repos in total!
```


## How it works

Based on GitHub's [advanced search API](https://help.github.com/articles/searching-repositories/), github-discovery finds a list of interesting repos for you! 

## How to contribute

It's still early days for github-discovery. The best way to contribute for now is to try it out and file issues with any ideas, bugs or suggestions. You can see a list of the working ideas [here](https://github.com/olivif/github-discovery#readme). 

#### Code style

#### Testing
We are using mocha and should for testing. And codecov for coverage tracking. All PRs must have at least the coverage currently on master.  

