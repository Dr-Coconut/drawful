import binascii
import math

def xor(A,B):
    string =""
    #print(A,B)
    for i in range(len(str(A))):
        b =((int(A[i])-int(B[i]))**2)
        string =string+str(b)
    return string


def binaryTo256bits(bits):
    size =len(bits)
    timesToRepeat = math.ceil(256/size)
    bits = bits*timesToRepeat
    size =len(bits)
    set1 = bits[:256]
    set2 = bits[256:]
    return set1,set2

def convert(password):
    arr = bytes(password, 'utf-8')
    bits = bin(int(binascii.hexlify(arr),16))
    bits =bits[2:]
    complete = "0"*256
    overflow = bits
    for _ in range(len(bits)*13):
        newComplete,overflow = binaryTo256bits(overflow+"101"+overflow)
        complete = xor(complete,newComplete)

    return complete  

#value = convert("Hello World")
#print(value)
#print(len(value))
