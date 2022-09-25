#!/bin/sh

common_package=microservices-hk-common

function upgrade_common() {
  echo -e "\n\nUpgrading common package\n\n"
  cd common && npm version patch && npm publish
  echo -e "Done 🚀"
}


function upgrade_service() {
  echo -e "\n\nUpgrading $common_package for $1 microservice\n\n"

  cd ../$1 && yarn upgrade $common_package
}

upgrade_common

sleep 5s

upgrade_service gateway
upgrade_service notifications
upgrade_service orders
upgrade_service payments
upgrade_service products
upgrade_service feedbacks
upgrade_service users

echo -e "\n\n\t\tDone 🚀\n\n"