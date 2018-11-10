#!/bin/bash

if [ ! -f /auth.json ]; then
    echo "Missing credentials; add an auth.json file with token"
fi

# install modules
npm install

# run server
node bot.js

fi
