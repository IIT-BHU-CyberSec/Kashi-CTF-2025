from pwn import remote
from AES import decrypt_block, xor, unpad, decrypt
import json

target = remote("172.17.0.3", 50001)

for _ in range(10):
    data = json.loads(target.recvuntil(b"}"))
    key = bytes.fromhex(data["key"])
    ct = bytes.fromhex(data["ciphertext"])
    iv = xor(b"KashiCTF", decrypt_block(key, ct[:16])[:8])*2
    
    target.recvuntil(b"iv: ")
    target.sendline(iv.hex().encode())

data = json.loads(target.recvuntil(b"}"))
key = bytes.fromhex(data["key"])
ct = bytes.fromhex(data["ciphertext"])
iv = xor(b"KashiCTF", decrypt_block(key, ct[:16])[:8])*2
print(unpad(decrypt(key, ct, mode="CBC", iv=iv), 16))
