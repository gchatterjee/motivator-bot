#!/bin/bash

if [ ! -f ./auth.json ]; then
  echo "Missing credentials; add an auth.json file with token"
else
  npm install
  node bot.js
fi
