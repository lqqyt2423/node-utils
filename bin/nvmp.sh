#!/bin/bash

function nvmp() {
    curVersion=$(nvm current)
    version=$(nvmd find)

    if [ ! -z "$version" ] && [ "$curVersion" != "$version" ]
    then
        nvm use $version
    fi
}
nvmp

function cd() {
    builtin cd $1
    nvmp
}
