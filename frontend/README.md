Gulp setup for Tactical Media Files
===========

Build html files for new Tactical Media Files site.

## Setup

Run NPM to install all needed developer dependencies listed in `package.json`.

```bash
$ npm install
```

## Developing

This uses a source directory `source` and tests and publishes its files in a directory `public`. 
I wanted to make it all configurable with a seperate build task but that was a bit too much of a hassle for now.

To start developing and run a simultaneous watch task, run the default gulp taks with:

```bash
$ gulp
```

It will do a first build and start a watch task with BrowserSync on the source directory.
