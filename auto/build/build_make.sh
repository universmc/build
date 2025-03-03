#!/bin/bash

build_css() {
  echo "Building CSS..."
}

build_js() {
  echo "Building JS..."
}

build_html() {
  echo "Building HTML..."
}

build_server() {
  echo "Building server.json..."
}

build_all() {
  build_css &
  build_js &
  build_html &
  build_server &
  wait
}

watch() {
  while true; do
    build_all
    sleep 1
  done
}

if [ "$1" == "build" ]; then
  build_all
elif [ "$1" == "watch" ]; then
  watch
else
  echo "Usage: $0 [build|watch]"
fi