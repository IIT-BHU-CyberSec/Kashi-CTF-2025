# Random-Inator [MEDIUM]

## crypto

## Author

- Argus817

## Description

Dr. Heinz Doofenshmirtz plans to take over the Tri-State Area. He created this super secret uncrackable encryption program with the help of his robot buttler Norm. Help Perry the Platypus decrypt the message and sabotage his evil plans.

Attachments: [server.py](attachments/server.py)

## Socat server

`nc <host> 50001` 

## Flag

`KashiCTF{Y0u_brOK3_mY_R4Nd0m_In4t0r_Curse_yOu_Perry_tH3_Pl4TYpus}`

## Solution

The given script makes use of a PRNG of unknown origin to get the KEY and initialization vector IV for encryption. The encrypted flag is given and the program asks for any input and encrypts it. A significant hint is `I don't like to repeat myself here but it just happens`. Since the PRNG is of unknown origin and Dr Doofenshmirtz is not so clever, the PRNG may have a flaw. After repeated inputs, it is found that the same sequence of IVs repeat themselves after regular intervals. Hence the key is the last one in this sequence. A simple AES decryption will then reveal the flag.
