# Absolutely Encrypted Shenanigans [MEDIUM]

## crypto

## Author

- Argus817

## Description

Lets see you break this. I even gave you the key

Attachments: [server.py](../attachments/server.py), [AES.py](../attachments/AES.py)

## Socat server

`nc <host> 50001` 

## Flag

`KashiCTF{AES_Unbr34KAbl3_but_t0T4lly_br3Akable_mAyb3}`

## Writeup

We are given two files server.py and AES.py. server.py is the script running on the netcat server. 

```bash
$ nc 172.17.0.3 50001                
{"key": "799511d11311be6fd7e94c16f9741cad", "ciphertext": "3246ebd92fc791b8a5ebe95a4bccb0f5073c2e07dcdcabf5fab7ff7615944c093e78ba9cf971d6b0e80ec5d2a6d269b1"}
Enter iv: ^C
```



On analysing this script, it is understood that in each of the 10 iterations, a random KEY of 16 bytes is used to encrypt the flag with a random IV of 16 bytes made of 8 random bytes repeated 2 times. Hence the IV can be obtained by decrypting the first 16 blocks using the key and then xoring the first 8 blocks of the decrypted text with `KashiCTF`.

Let `D(ciphertext)` be the `decrypt_block` function with the given key

```python
IV = xor(b"KashiCTF", D(ct[:16])[:8])*2
```

For the `decrypt_block` function, one would first need to analyse AES.py. On a first look, it seems to be textbook AES. But `shift_rows` function says otherwise. Hence one would need to write their own functions for AES decryption. 

Complete decryption functions given in [solve/AES.py](AES.py).

Now IV can be found and `flag` can be decrypted using below solve script.

```python
from AES import decrypt_block, decrypt, unpad, xor
from pwn import remote
import json

target = remote("172.17.0.3", 50001)

data = json.loads(target.recvuntil(b"}"))
key = bytes.fromhex(data["key"])
ct = bytes.fromhex(data["ciphertext"])
iv = xor(b"KashiCTF", decrypt_block(key, ct[:16])[:8])*2

flag = unpad(decrypt(key, ct, mode="CBC", iv=iv), 16)
print(flag)
```

But this gives a fake flag.

```bash
$ python3 solve.py
[+] Opening connection to 172.17.0.3 on port 50001: Done
b'KashiCTF{AES??_HeHe_Fake_Flag;)}'
[*] Closed connection to 172.17.0.3 port 50001
```

Hence, the real flag can only be the `secret` variable given in server.py. Hence one must submit the IV to the server 10 times and then receive the encrypted actual flag. This can be done by including the above script inside a loop and send the IV everytime it is asked. Once the `secret` ciphertext is obtained, it can be decrypted similarly to obtain the actual flag.

Entire solve script is given in [solve.py](solve.py).

```bash
$ python3 solve.py
[+] Opening connection to 172.17.0.3 on port 50001: Done
b'KashiCTF{AES_Unbr34KAbl3_but_t0T4lly_br3Akable_mAyb3}'
[*] Closed connection to 172.17.0.3 port 50001
```
