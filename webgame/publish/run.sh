#! /bin/sh

RootDir=`dirname $0`

cd $RootDir

nohup nodejs app.js >a.log 2>&1 & 
