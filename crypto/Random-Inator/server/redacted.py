import math 
import random

class PRNG():
    def __init__(self):
        p = 69
        
        n = 0
        i = 1
        while True:
            num = (10**i)-1
            if num%p==0:
                n = i 
                break
            i += 1 
        
        self.states = [int(i) for i in str(math.floor((10**n)/p))]
        self.state = random.randint(0, 696969) % len(self.states) 

    def getBytes(self, size : int):
        random.seed(self.states[self.state])
        self.state = (self.state + 1) % len(self.states)
        return bytes([random.randint(0,696969)%256 for _ in range(size)])

FLAG = open("/flag.txt", 'r').read().strip().encode()
