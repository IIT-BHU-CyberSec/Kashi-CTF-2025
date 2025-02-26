# Corruption [MEDIUM]

## forensics

## Author

- Argus817

## Description

A corrupt drive I see...

Attachments: [image.iso](https://drive.google.com/file/d/1gHY5DOmUcZvfrLr-EpQWJfR3oiVCsYtD/view?usp=sharing)

## Flag

`KashiCTF{FSCK_mE_B1T_by_b1t_Byt3_by_byT3}`

## Solution

The ExFAT signature in the image is corrupt. Only the second byte is wrong. It should be changed from hex value 69 to hex value 76.
