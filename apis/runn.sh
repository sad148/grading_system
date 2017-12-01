#!/bin/sh
for f in *.java
do
	javac $f
    let pos=${#f}-5
    n=${f:0:pos}
    java $n 
done
