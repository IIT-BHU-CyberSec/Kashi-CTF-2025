from pwn import remote
import random
import hashlib
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Util.number import isPrime

class EllipticCurve(object):    #Weierstrass type
    """
    Elliptic Curve Implementation by Argus817
    """
    def __init__(self,p,a,b):
        self.a = a
        self.b = b
        self.p = p
        self.O = self.identity()

        if (4*(a**3)+27*(b**2))==0:
            raise Exception("Curve is not smooth")
        if not isPrime(p):
            raise Exception(f"{p} is not prime")

    def __eq__(self,other):
        return (self.a, self.b, self.p) == (other.a, other.b, other.p)

    def __repr__(self):
        s = f"p = {self.p}, curve: y^2 = x^3 "
        if self.a>0:
            s += f"+ {self.a}*x "
        elif self.a<0:
            s += f"- {-self.a}*x "
        if self.b>0:
            s += f"+ {self.b}"
        elif self.b<0:
            s += f"- {-self.b}"
        return s
    
    def identity(self):
        return self._identity(self)

    class _identity(object):
        def __init__(self,outer):
            self.curve = outer

        def __repr__(self):
            return f"Identity"

        def __pos__(self):
            return self

        def __neg__(self):
            return self

        def __add__(self,Q):
            return Q

        def __sub__(self,Q):
            return -Q

    def point(self,x,y):
        return self.Point(self,x,y)

    class Point(object):
        def __init__(self,outer,x,y):            
            self.curve = outer
            p = self.curve.p
            self.x = x % p
            self.y = y % p
            
            if pow(self.y,2,p) != (pow(self.x,3,p) + ((self.curve.a * self.x)%p) + self.curve.b)%p:
                raise ValueError(f"Point ({self.x},{self.y}) does not lie on curve")

        def __repr__(self):
            return f"({self.x},{self.y})"

        def __eq__(self,other):
            return (self.curve, self.x, self.y)==(other.curve, other.x, other.y)

        def __neg__(self):
            return self.curve.Point(self.curve,self.x, -self.y)

        def __pos__(self):
            return self

        def __add__(self,Q):
            if self.curve != Q.curve:
                raise Exception("Curves don't match in addition")

            l = 0
            p = self.curve.p
            a = self.curve.a
            if isinstance(Q,self.curve._identity):
                return self

            x1,y1,x2,y2 = self.x, self.y, Q.x, Q.y
            if (x1==x2) and (y1==p-y2):
                return self.curve.O

            if self==Q:
                l = ((((3*pow(x1,2,p))%p)+a)%p * pow((2*y1),-1,p)) % p
            else:
                ydiff = (p + y2 - y1)%p
                xdiff = (p + x2 - x1)%p
                l = (ydiff * pow(xdiff,-1,p))%p

            x3 = (pow(l,2,p) + (2*p) - x1 - x2)%p
            y3 = ((l*((p+x1-x3)%p))%p + p - y1) % p
            return self.curve.Point(self.curve,x3,y3)

        def __sub__(self,Q):
            if self.curve != Q.curve:
                raise Exception("Curves don't match in subtraction")

            return self+(-Q)
        
        def __mul__(self,n):
            

            Q = self
            R = self.curve.O
            while (n>0):
                if (n%2==1):
                    R = R+Q
                Q = Q+Q
                n = n//2
            return R

        def __rmul__(self,n):
            return self.__mul__(n)

#Curve Parameters (NIST P-384)
p = 39402006196394479212279040100143613805079739270465446667948293404245721771496870329047266088258938001861606973112319
a = -3
b = 27580193559959705877849011840389048093056905856361568521428707301988689241309860865136260764883745107765439761230575
E = EllipticCurve(p,a,b)
G = E.point(26247035095799689268623156744566981891852923491109213387815615900925518854738050089022388053975719786650872476732087,8325710961489029985546751289520108179287853048861315594709205902480503199884419224438643760392947333078086511627871)

def decrypt(shared_secret, ct, iv):
    sha1 = hashlib.sha1()
    sha1.update(str(shared_secret).encode("ascii"))
    key = sha1.digest()[:16]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    pt = cipher.decrypt(ct)
    pt = unpad(pt, 16)
    return pt

target = remote('172.17.0.3', 50001)

target.recvuntil(b'Public Key: ')
x,y = map(int, target.recvuntil(b'\n\n').strip().decode()[1:-1].split(','))
P_A = E.point(x,y)

n_B = random.randint(1,p-1)
P_B = n_B * G

target.recvuntil(b'x-coord: ')
target.sendline(str(P_B.x).encode())
target.recvuntil(b'y-coord: ')
target.sendline(str(P_B.y).encode())

target.recvuntil(b"Message: ")
data = json.loads(target.recvuntil(b"}").decode())
ct = bytes.fromhex(data['ciphertext'])
iv = bytes.fromhex(data['iv'])

S = P_A * n_B

print(decrypt(S.x, ct, iv))

