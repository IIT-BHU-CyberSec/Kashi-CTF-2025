# Restaurant

## Forensics

## Author
ScourgeXV

## Difficulty
Medium

## Challenge File
pasta.jpg

## Description
I just asked for my favourite pasta and they gave me this. Are these guys STUPID? Maybe in the end they may give me something real. (Wrap the text in KashiCTF{})

## Solution
Searching this image on google will tell this is Bacon pasta. Opening the image in hex editor and reading the extra hexadecimal data appended to the file at the end will give us bacon ciphertext. Decoding this will give us text which on wraping in flag format give the flag.

## Flag
KashiCTF{THEYWEREREALLLLYCOOKING}