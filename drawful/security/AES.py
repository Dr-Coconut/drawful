#converts text to chunks of data for encryption



import binascii
from aesEncryptor import *
from roundKeyMaker import *
def resolve(data):
    v =(len(data))
    value =""
    for i in range(v-2):
        value=value+data[i+2]
    return value

def AESencrypt(data,key):
    ###########################################################################################################################################
    ###########################################################################################################################################
    #takes an input and takses the 1st 256 bit chunk. if it isnt 256 bit then the NOT value for the last bit is appended until it is 256 bit

    value ="0b"
    for i in range(len(data)):
        a= bin(int.from_bytes((data[i]).encode(), 'big'))
        value =value+"0"*(8-len(resolve(a)))
        value =value+resolve(a)
    start =value
    resolvedStart =resolve(start)
    ##print(resolvedStart)
    ###########################################################################################################################################
    ###########################################################################################################################################
    #we are now going to break this up into 256 bit chunks
    #and then individually encrypt them
    chunks =[]

    for i in range(0,(len(resolvedStart)//256)+1):
        data =""
        for j in range(0,256):
            try:
                data =data+resolvedStart[i*256+j]
            except:
                pass
        try:
            if len(data)!=256:
                data =data+str(((int(data[len(data)-1])-1)**2))*(256-len(data))
            chunks.append(data)
        except:
            pass

    ##print(chunks)
    #now each chunk is the right size and will be easy to turn back into ascii for use elsewhere
    chunk =chunks[0]
    b =""

    key =generate(key)
    #################
    for i in range(len(chunks)):
        #print(i)
        #print(chunks[i])
        #key ="0101010101010101010101010101010101010101010101010101010101010101011111010001110110100111010010010110101101011010010110100101101001010110101010101010100101011011100001110101010101011101010101010101010101010101111000011110000111100001111000011110000111100001"
        a = encrypt(chunks[i],key)
        #print(a)
        #print("***********************************************************************************")
        b =b+str(a)

    return b

def AESdecrypt(b,key):
    resolvedStart =b
    ##print(resolvedStart)
    ###########################################################################################################################################
    ###########################################################################################################################################
    #we are now going to break this up into 256 bit chunks
    #and then individually encrypt them
    chunks =[]

    for i in range(0,(len(resolvedStart)//256)+1):
        data =""
        for j in range(0,256):
            try:
                data =data+resolvedStart[i*256+j]
            except:
                pass
        chunks.append(data)
    del  chunks[-1]
    b=""
    #print("@"*100)
    key =generate(key)
    for i in range(len(chunks)):
        #print(chunks[i])
        #print("%%%")
        a = decrypt(chunks[i],key)
        #print(a)
        #print("***********************************************************************************")
        b =b+str(a)

    #print(b)
    #print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    chunk =b
    lastVal = chunk[-1]
    while chunk[-1] ==lastVal:
        chunk = chunk[:-1]
    #print(chunk)
    a ="0b"+chunk
    n = int(a, 2)
    c =binascii.unhexlify('%x' % n)
    c =str(c)
    a =""
    for i in range(len(c)):
        if i ==0 or i ==1 or i==len(c)-1:
            i =i
        else:
            a =a+str(c[i])

    #print(a)
    return a

###if more than 32 characters are sent system fails
#key="1001100011001010111010000100111011100110110000101101100011011000110100001100001011101100110010101100110011101010110111001100001011011100110010001110000011011000110000101111001011101000110111101100111011001010111010001101000011001010111001000100001001101100"
##
##

#data =input(">>>")
#data =AESencrypt(data,key)
#print(data)
#data =AESdecrypt(data,key)
#print(data)
