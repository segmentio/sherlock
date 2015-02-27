[![Build Status](https://circleci.com/gh/segmentio/sherlock.png?circle-token=549661cd6c45d67690129d9737a0402f31cb1657)](https://circleci.com/gh/segmentio/sherlock)

# Sherlock

Detect which integrations a website is using and find their API keys.

## Example

```js
var sherlock = require('sherlock');
var thunkify = require('thunkify');
sherlock.analyze = thunkify(sherlock.analyze.bind(sherlock));
var results = sherlock.analyze('segment.com');
```

## Develop

```js
  $ git clone segmentio/sherlock && cd sherlock
  $ make server
```

## Note

You will **need** to install PhantomJS separately. If you're using Homebrew, you can do this with the following command:

```js
  $ sudo brew update && brew install phantomjs
```
