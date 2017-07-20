# Company Website for LearnHop.com

## Installation

### template source:

* https://www.authenticpixels.com/product/startkit-responsive-startup-business-template

### Technology Used

* middleman static site generator
* node.js + ruby

### Setup (For Mac OSX)

Pre-requisite:

* Install node.js and npm

Go to https://nodejs.org/en/download/ and download node.js Mac Installer and follow screen instruction to install it.

after it's done, please check the version of node.js

```
$ node -v
```

* Install bower

```
$ npm -g bower
```

* Install RVM and Bundler

See https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/

* Check out code:

```
git clone ...
```

Install dependencies

```
bower install && bundle install
```

### Preview

```
$ middleman server
```

Visit http://localhost:4567

### Deploy to staging server

Staging: http://dev.learnhop.com

```
$ curl -X POST -d '{}' https://api.netlify.com/build_hooks/58a12d0bc4d9cc1b57b8b723
```

### Deploy to production server

(Configured in config.rb file)

```
$ middleman rsync production
```

## Content Editing Tips

* See all data/ files for quick addition of repetitive text.
* Blog Image Size: 800x350
* Feature Image Size: 540x309 (1996x1144)
