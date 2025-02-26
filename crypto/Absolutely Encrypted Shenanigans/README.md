# Absolutely Encrypted Shenanigans [MEDIUM]

## crypto

## Author

- Argus817

## Description

Lets see you break this. I even gave you the key

Attachments: [server.py](attachments/server.py), [AES.py](attachments/AES.py)

## Socat server

`nc <host> 50001` 

## Flag

`KashiCTF{AES_Unbr34KAbl3_but_t0T4lly_br3Akable_mAyb3}`

## Solution

The algorithm is a modified AES encryption algorithm. Decryption algorithm can be easily written by reversing. Decryption algorithm given in [solve/AES.py](solve/AES.py). 

A random IV of 16 bytes is used which is made up of 8 bytes repeated 2 times. This IV can be found by decrypting the first block of ciphertext and xoring it with "KashiCTF". Submitting the IV 10 times will reveal the encrypted flag. Decryption of flag is similar to previous decryptions.

Solve script given in [solve.py](solve/solve.py)
