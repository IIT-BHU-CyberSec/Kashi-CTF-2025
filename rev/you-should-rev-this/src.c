#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define MAX_LEN 31


void read_and_print_file(const char *filename) {
    char ch;
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        perror("error opening flag");
        return;
    }
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }
    fclose(file);
}

int main() {
    setbuf(stdout, NULL);
    char input[MAX_LEN+1];
    int i;
    const char* password = "e1n5tds4bu4et1n4ui2oh2ou4s4tu2o"; // passw = d0m4scr3at3ds0m3th1ng1nt3r3st1n
    printf("Enter the password: ");
    fgets(input, MAX_LEN+1, stdin);
    input[MAX_LEN] = 0;
    
    printf("Got input: '%s'\n", input);

    for (i=0; i<MAX_LEN; i++) {
        if(password[i] != input[i]+1){
            printf("nope\n");
            return -1;
        }
        usleep(10000); // microseconds
    }

    read_and_print_file("/flag.txt");
    return 0;
}
