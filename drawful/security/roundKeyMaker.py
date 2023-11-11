from bitstring import BitArray
def resolve(data):
    v =(len(data))
    value =""
    for i in range(v-2):
        value=value+data[i+2]
    return value

def xor(A,B):
    return ((int(A)-int(B))**2)

def diagnostic(array):
    for i in range(len(array)):
        i =i

def LookUp(HexVal,Sbox):
    for i in range(len(Sbox)):
        try:
            j = Sbox[i].index(str(HexVal))
            Data = hex(j)
            comp =""
            for x in range(len(Data)-2):
                comp=comp+Data[x+2]
            j =comp
            Data = hex(i)
            comp =""
            for x in range(len(Data)-2):
                comp=comp+Data[x+2]
            i =comp
            return(str(j)+str(i))
        except:
            pass



from tinyec import registry

def generate(boi):
    #########################################################################################
    #########################################################################################
    #Produces the curve via elyptic curve cryptography
    b = BitArray(bin=boi)
    boi = b.uint


    #########################################################################################
    #########################################################################################
    #making the cypherkeys
    BinData =resolve(bin(boi))
    #print(BinData)
    #print(BinData)
    #print("<>"*30)
    HexData =resolve(hex(boi))
    CypherKey1 =[]
    for i in range(4):
        row =[]
        for j in range(8):
            x =i*4+j
            Byte =str(HexData[x*2])+str(HexData[(x*2)+1])
            row.append(Byte)
        CypherKey1.append(row)


    KEYS =[]
    for k in range(15):
        #########################################################################################
        #########################################################################################
        #so at this point we have our key in 2 forms (this makes life easier for different tasks)
        #but now have to turn our one CypherKey and make 15 round keys.
        #see the AES section on how we make these (good luck explaining that future tom)
        #step 1 we are gonna do a lot of xor stuff so lets make an xor function
        #we have to rotate our "words" now, you know "words". because you read the documentation
        #########################################################################################
        #########################################################################################
        #rotates the key( 1234 becomes 2341. or F3 77 C2 1D vbecomes 77 C2 1D F3)
        #for.........................................................................................................security reasons
        state1 =[CypherKey1[0][7],CypherKey1[1][7],CypherKey1[2][7],CypherKey1[3][7]]
        value =state1[0]
        del state1[0]
        state1.append(value)
        #########################################################################################
        #########################################################################################
        #now we have done ROTword
        # now for each element we need to change its value via the S-box lookup table
        ##   | 0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
        ##---|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
        ##00 |63 7c 77 7b f2 6b 6f c5 30 01 67 2b fe d7 ab 76 
        ##10 |ca 82 c9 7d fa 59 47 f0 ad d4 a2 af 9c a4 72 c0 
        ##20 |b7 fd 93 26 36 3f f7 cc 34 a5 e5 f1 71 d8 31 15 
        ##30 |04 c7 23 c3 18 96 05 9a 07 12 80 e2 eb 27 b2 75 
        ##40 |09 83 2c 1a 1b 6e 5a a0 52 3b d6 b3 29 e3 2f 84 
        ##50 |53 d1 00 ed 20 fc b1 5b 6a cb be 39 4a 4c 58 cf 
        ##60 |d0 ef aa fb 43 4d 33 85 45 f9 02 7f 50 3c 9f a8 
        ##70 |51 a3 40 8f 92 9d 38 f5 bc b6 da 21 10 ff f3 d2 
        ##80 |cd 0c 13 ec 5f 97 44 17 c4 a7 7e 3d 64 5d 19 73 
        ##90 |60 81 4f dc 22 2a 90 88 46 ee b8 14 de 5e 0b db 
        ##a0 |e0 32 3a 0a 49 06 24 5c c2 d3 ac 62 91 95 e4 79 
        ##b0 |e7 c8 37 6d 8d d5 4e a9 6c 56 f4 ea 65 7a ae 08 
        ##c0 |ba 78 25 2e 1c a6 b4 c6 e8 dd 74 1f 4b bd 8b 8a 
        ##d0 |70 3e b5 66 48 03 f6 0e 61 35 57 b9 86 c1 1d 9e 
        ##e0 |e1 f8 98 11 69 d9 8e 94 9b 1e 87 e9 ce 55 28 df 
        ##f0 |8c a1 89 0d bf e6 42 68 41 99 2d 0f b0 54 bb 16
        #########################################################################################
        #########################################################################################
        Sbox =[]
        Unorganised = "63 7c 77 7b f2 6b 6f c5 30 01 67 2b fe d7 ab 76 ca 82 c9 7d fa 59 47 f0 ad d4 a2 af 9c a4 72 c0 b7 fd 93 26 36 3f f7 cc 34 a5 e5 f1 71 d8 31 15 04 c7 23 c3 18 96 05 9a 07 12 80 e2 eb 27 b2 75 09 83 2c 1a 1b 6e 5a a0 52 3b d6 b3 29 e3 2f 84 53 d1 00 ed 20 fc b1 5b 6a cb be 39 4a 4c 58 cf d0 ef aa fb 43 4d 33 85 45 f9 02 7f 50 3c 9f a8 51 a3 40 8f 92 9d 38 f5 bc b6 da 21 10 ff f3 d2 cd 0c 13 ec 5f 97 44 17 c4 a7 7e 3d 64 5d 19 73 60 81 4f dc 22 2a 90 88 46 ee b8 14 de 5e 0b db e0 32 3a 0a 49 06 24 5c c2 d3 ac 62 91 95 e4 79 e7 c8 37 6d 8d d5 4e a9 6c 56 f4 ea 65 7a ae 08 ba 78 25 2e 1c a6 b4 c6 e8 dd 74 1f 4b bd 8b 8a 70 3e b5 66 48 03 f6 0e 61 35 57 b9 86 c1 1d 9e e1 f8 98 11 69 d9 8e 94 9b 1e 87 e9 ce 55 28 df 8c a1 89 0d bf e6 42 68 41 99 2d 0f b0 54 bb 16 "
        #this list sucks
        UnorganisedList =[]
        value =""
        for i in range(len(Unorganised)):
            if Unorganised[i] ==" ":
                UnorganisedList.append(value)
                value =""
            else:
                value =value+Unorganised[i]

        for i in range(16):
            row =[]
            for j in range(16):
                row.append(UnorganisedList[i*16+j])
            Sbox.append(row)

        #########################################################################################
        #########################################################################################
        #this performs the lookup for our key
        #(swaps the element with its coordinates)
        TempState1 =[]
        for i in range(len(state1)):
            temp = LookUp(state1[i],Sbox)
            TempState1.append(temp)
        #########################################################################################
        #########################################################################################
        #production of Rcon list
        #i hope you read the paper on this because im not writing it again here.
        UnsortedRcon =["01","02","04","08","10","20","40","80","1B","36","6C","D8","AB","4D","9A","2F","5E","BC","63","C6","97","35","6A","D4","B3","7D","FA","EF","C5"]

        Rcon =[]
        row =[]
        for i in range(len(UnsortedRcon)):
            row.append("00")

        Rcon.append(UnsortedRcon)
        Rcon.append(row)
        Rcon.append(row)
        Rcon.append(row)
        # e.g the first batch will be [01,00,00,00]
        #########################################################################################
        #########################################################################################
        #first XOR (first column of cypherkey + First Rcon + TempState1


        #YAY we got our stupid table (check wikipedia notes because 256 bit is irrelevant i guess)(REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE)
        Col =[CypherKey1[0][0],CypherKey1[1][0],CypherKey1[2][0],CypherKey1[3][0]]

        Col2 =[Rcon[0][k],Rcon[1][k],Rcon[2][k],Rcon[3][k]]
        Col3 =TempState1

        #making binary column
        BinCol =[]
        for i in range(len(Col)):
            x =resolve(bin(int(Col[i], 16)))
            x ="0"*(8-len(x))+x
            BinCol.append(x)

        #making binary Rcon
        BinCol2 =[]
        for i in range(len(Col2)):
            x =resolve(bin(int(Col2[i], 16)))
            x ="0"*(8-len(x))+x
            BinCol2.append(x)

        #making the binary tempstate
        BinCol3 =[]
        for i in range(len(Col3)):
            x =resolve(bin(int(Col3[i], 16)))
            x ="0"*(8-len(x))+x
            BinCol3.append(x)
        #########################################################################################
        #########################################################################################
        #now we have to xor these together
        Part1 =[]
        data =""
        for i in range(len(BinCol)):
            byte =""
            for j in range(len(BinCol[i])):
                value =xor(xor(BinCol[i][j],BinCol2[i][j]),BinCol3[i][j])
                byte =byte+str(value)
                data =data+str(value)
            Part1.append(byte)
        key1 =data

        #########################################################################################
        #########################################################################################
        #this is part 1 of 8 for the 1st of 15 keys
        #now we just xor the remaining columns of the cypherkey with the previous output
        #so part1 + column2 =part2
        #and part2+column3 =part3
        for t in range(7):
            Col =[CypherKey1[0][t+1],CypherKey1[1][t+1],CypherKey1[2][t+1],CypherKey1[3][t+1]]

            BinCol =[]
            for i in range(len(Col)):
                x =resolve(bin(int(Col[i], 16)))
                x ="0"*(8-len(x))+x
                BinCol.append(x)

            PartX =[]
            data =""
            for i in range(len(BinCol)):
                byte =""
                for j in range(len(BinCol[i])):
                    value =xor(BinCol[i][j],Part1[i][j])
                    byte =byte+str(value)
                    data =data+str(value)
                PartX.append(byte)
            key1 =key1+data
            Part1 = PartX
        KEYS.append(key1)
        HexData =resolve(hex(int(key1,2)))
        CypherKey1 =[]
        for i in range(4):
            row =[]
            for j in range(8):
                x =i*4+j
                Byte =str(HexData[x*2])+str(HexData[(x*2)+1])
                row.append(Byte)
            CypherKey1.append(row)

    diagnostic(KEYS)

    #print(len(KEYS))
    #print(KEYS)
    return KEYS
    #checkmate

