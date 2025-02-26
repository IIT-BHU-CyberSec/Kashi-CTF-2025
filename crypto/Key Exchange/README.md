# Key Exchange [MEDIUM]

## crypto

## Author

- Argus817

## Description

Someone wants to send you a message. But they want something from you first.

Attachments: [server.py](attachments/server.py)

## Socat server

`nc <host> 50001` 

## Flag

`KashiCTF{I_r3V3Al3d_my_Pub1Ic_K3y_4nd_4ll_1_g0t_w4s_th1s_L0usy_Fl4G}`

## Solution

The challenge is based on the Diffie-Hellman Key Exchange protocol using ECC. Curve parameters are given. Key exchange occurs between user and server and then encrypted flag is shared. Flag is encrypted using shared secret

Solution script given in [solve.py](solve/solve.py)

After decrypting flag using AES, another decryption is required using the Vigenere Cipher with the given key and the flag is obtained.
