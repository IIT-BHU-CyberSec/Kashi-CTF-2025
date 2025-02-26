#include <stdio.h>
#include <stdlib.h>

// gcc chall.c -no-pie -o chall

void win(int a, int b, int c) {
  if (a > 0xde && b > 0xad && c > 0xc0de) {
    FILE *file = fopen("/flag.txt", "r");
    if (file == NULL) {
        puts("Failed to open file");
        exit(1);
    }
    char line[100];
    if (fgets(line, sizeof(line), file) != NULL) {
        printf("flag is : %s", line);
    } else {
        puts("Failed to read line");
    }

      fclose(file);
  }
  else{
    printf("Bro where are the arguments ?");
    exit(0x45);
  }
}
int main(){
    void *addrptr;
    printf("i like to jump where ever you say \ngive me the address to go : ");
    scanf("%p", (void**)&addrptr);
    
    asm volatile (
          "sub $0x10, %%rsp;"  // Stack alignment for function calls
          "jmp *%0;"          // Indirect call instead of jump for safety
          : : "r" (addrptr)
    );
}
