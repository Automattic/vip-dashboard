![VIP Dashboard](http://cloud.scott.ee/images/vip-dashboard.png)

# VIP Dashboard

WordPress plugin that provides a new dashboard for VIP and VIPv2 clients. The new interface features statistics and a new suite of tools for v2.

The interface is built with [React.js](https://facebook.github.io/react/).

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [NPM](https://docs.npmjs.com/getting-started/what-is-npm) installed. Here's a [handy installer](https://nodejs.org/download/) for Windows, Mac, and Linux.

The repository is a sub-module of the [mu-plugins](https://github.com/Automattic/vipv2-mu-plugins) directory. The dashboard is dependent on functions that exists within the mu-plugins repository and will not work without them.

### Gulp

[Gulp](http://gulpjs.com/) is required to work on this repository. We use Gulp to compile JSX into valid JavaScript and manage other assets such as CSS and images.

To get setup run the following command in the `vip-dashboard` directory:

```
npm install
```

Once node has completed the install you should set the URL to your local development site in `gulpfile.js`. Line 50:

```
proxylocation: 'vip.w.dev'
```

You can then run the default gulp task by running:

```
gulp
```

The default task watches for changes to files and re-compiles assets when a change is detected. Your browser window will also automatically be refreshed with each change.

## Testing

Run

```
make lint
```

To test your JavaScript for errors.

## Directory Structure

```
├── readme.md
├── gulpfile.js
├── package.json
├── Makefile
├── vip-dashboard.php
├── .travis.yml
├── assets
│   └── css
│   └── img
│   └── js
├── components
│   └── ... react components
├── plugins-ui

```

### assets

Compiled assets, do not edit anything here.

### components

Where each react component lives with the relevent JSX and SCSS files.

### plugins-ui

Plugins interface adopted from v1.

## Coding Standards

[Coding Guidelines »](https://github.com/Automattic/calypso-pre-oss/blob/master/docs/coding-guidelines.md)
