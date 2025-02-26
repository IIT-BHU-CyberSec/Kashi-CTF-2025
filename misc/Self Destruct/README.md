# Self Destruct [Hard]

## misc

## Author

- Argus817

## Description

Explore the virtual machine and you might just find the flag. Or a surprise. Maybe....

NOTE: The attachment is a VirtualBox image. Do not run it outside VirtualBox. It is recommended to backup the .vdi file before launching the VM.

VM Parameters: (VirtualBox)
Type: Linux
Version: Debian (32 bits)
RAM: 1024MB
Storage: attached .vdi file

Username: kashictf  Password: kashictf

Attachments: [Self Destruct Debian.vdi](https://drive.google.com/file/d/1DFJn8cXhMBxq_NIixJo_J73Dkz9H2iSc/view?usp=drive_link) 

## Flag

`KashiCTF{rm_rf_no_preserve_root_Am_1_Right??_No_Err0rs_4ll0wed_Th0}`

## Solution

`cat` and `grep` would cause the OS to self destruct.

```
rgrep -sa "fLaG Part " /
```
