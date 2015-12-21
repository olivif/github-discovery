# github-discovery ideas

## CLI
The CLI should be very simple (will be simplified as per [15](https://github.com/olivif/github-discovery/issues/15))
 
`gd --contribute --language javascript --topic bitcoin`

## What to display after search
* [x] full name 
* [x] url (needs to be fixed - see [14](https://github.com/olivif/github-discovery/issues/14))
* [x] number of forks
* [x] number of stars
* [x] number of watchers

## What to search on 
* [x] topic (search for topic in name, description or readme)
* [x] include forks (should include forks, a lot of repos fork off and become a lot more successful than the parent)
* [x] last updated (yes, you only want to include *fresh* repos)
* [x] language (yes) 
* [x] has MIT license 
* [x] contains contribute/contributing .md or words in any md files
* [x] doesnt contain the words deprecated

## What to sort on 
* [ ] last updated
* [ ] forks
* [ ] stars

## Heuristics
This will be ranker v1 - see [10](https://github.com/olivif/github-discovery/issues/10) and [11](https://github.com/olivif/github-discovery/issues/11). The heuristics will create a set of categories that the user can filter on.

Project size 
* [ ] size of repo (buckets?)

Team size
* [ ] number of contributors

Popularity
* [ ] number of stars
* [ ] number of watchers

Extensibility
* [ ] number of forks

Needs help
* [ ] issues - has_issues + open_issues_count
* [ ] milestones coming up
* [ ] releases - has released before? is release coming up?

Good with contributors 
* [ ] number of pull requests merged in

Other
* [ ] owner stats
