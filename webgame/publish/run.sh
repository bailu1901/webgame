#! /bin/sh

RootDir=`dirname $0`

cd $RootDir

nohup nodejs webgame.js >a.log 2>&1 & 
