#!/bin/bash
set -e

### Configuration ###

APP_DIR=/var/www/scoreboard
GIT_URL=git://github.com/drasolon/scoreboard
RESTART_ARGS=

# Uncomment and modify the following if you installed Passenger from tarball
#export PATH=/path-to-passenger/bin:$PATH


### Automation steps ###

set -x

# Pull latest code
if [[ -e $APP_DIR/code ]]; then
  cd $APP_DIR/code
  git pull
else
  git clone $GIT_URL $APP_DIR/code
  cd $APP_DIR/code
fi

# Install dependencies
npm install --production
npm prune --production

# Restart app
passenger-config restart-app --ignore-app-not-running --ignore-passenger-not-running $RESTART_ARGS $APP_DIR/code