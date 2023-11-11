from roundKeyMaker import *

import binascii

def resolve(data):
    v =(len(data))
    value =""
    for i in range(v-2):
        value=value+data[i+2]
    return value

def xor(A,B):
    string =""
    #print(A,B)
    for i in range(len(str(A))):
        b =((int(A[i])-int(B[i]))**2)
        string =string+str(b)
    return string

def diagnostic(array):
    for i in range(len(array)):
        p=1
line ="{}"*30

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
            return(str(i)+str(j))
        except:
            pass

def LookUp2(HexVal,Box):
    x =int(HexVal[0],16)
    y= int(HexVal[1],16)
    return(Box[x][y])




def encrypt(chunk,keys):
    for o in range(0,15):

        ##########################################################################################################################
        ###########################################################################################################################################
        #future tom here
        """to perform the encyrption we need to do 4 steps 15 times. Step 1 is to just use our sbox to do a lookup table thing (EASY),
            Step 2 is to do a shift of the content of each row (EASY),
            step 4 is to just apply our key via an XOR (EASY),
            step 3 is to do matricies multiplication on a 4 by 4 array using a combination of xor and dot products(EASY)
            but i have to do step 3 in reverse to decrypt the message later(VERY HARD)**10000000000000000000000000000000000000000000000000000000000000000000000000000000
        """
        #see the problem
        #going backwards is supposed to be annoying
        #and the documentation for this is next to 0
        #this should be fun
        ###########################################################################################################################################
        #11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111#
        ###########################################################################################################################################


        #first we are going to xor the chunk with our first round key (this is a prototype so for ease the same key is used all 5 times (theoretically this could happen) (its just 1/(256!x15))
        SampleKey =keys[o]

        c=str(xor(chunk,SampleKey))
        chunk =c

        ###########################################################################################################################################
        #22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222#
        ###########################################################################################################################################
        HexChunk =resolve(hex(int(chunk,2)))
        if len(HexChunk)<64:
            HexChunk ="0"*(64-len(HexChunk))+HexChunk
        HexList =[]

        for i in range(int(len(HexChunk)/2)):
            HexList.append(HexChunk[i*2]+HexChunk[1+i*2])
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
        for i in range(len(HexList)):
            temp = LookUp2(HexList[i],Sbox)
            TempState1.append(temp)
        ###########################################################################################################################################
        #33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333#
        ###########################################################################################################################################
        #just shifting rows (not very difficult

        chunk =[]
        for i in range(4):
            row =[]
            for j in range(8):
                row.append(TempState1[i*8+j-1])
            chunk.append(row)


        shifted =[]
        for i in range(4):
            row = chunk[i]

            for j in range(i):
                value =row[0]
                del row[0]
                row.append(value)

            shifted.append(row)
        ###########################################################################################################################################
        #44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444#
        ###########################################################################################################################################
        multiplyer =[["02","03","01","01"],["01","02","03","01"],["01","01","02","03"],["03","01","01","02"]]
        ##################################################
        #e table creation
        ##################################################
        Ebox =[]
        Unorganised ="01 03 05 0F 11 33 55 FF 1A 2E 72 96 A1 F8 13 35 5F E1 38 48 D8 73 95 A4 F7 02 06 0A 1E 22 66 AA E5 34 5C E4 37 59 EB 26 6A BE D9 70 90 AB E6 31 53 F5 04 0C 14 3C 44 CC 4F D1 68 B8 D3 6E B2 CD 4C D4 67 A9 E0 3B 4D D7 62 A6 F1 08 18 28 78 88 83 9E B9 D0 6B BD DC 7F 81 98 B3 CE 49 DB 76 9A B5 C4 57 F9 10 30 50 F0 0B 1D 27 69 BB D6 61 A3 FE 19 2B 7D 87 92 AD EC 2F 71 93 AE E9 20 60 A0 FB 16 3A 4E D2 6D B7 C2 5D E7 32 56 FA 15 3F 41 C3 5E E2 3D 47 C9 40 C0 5B ED 2C 74 9C BF DA 75 9F BA D5 64 AC EF 2A 7E 82 9D BC DF 7A 8E 89 80 9B B6 C1 58 E8 23 65 AF EA 25 6F B1 C8 43 C5 54 FC 1F 21 63 A5 F4 07 09 1B 2D 77 99 B0 CB 46 CA 45 CF 4A DE 79 8B 86 91 A8 E3 3E 42 C6 51 F3 0E 12 36 5A EE 29 7B 8D 8C 8F 8A 85 94 A7 F2 0D 17 39 4B DD 7C 84 97 A2 FD 1C 24 6C B4 C7 52 F6 01 "
        ##
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
            Ebox.append(row)

        ##################################################
        #l table creation
        ##################################################
        Lbox =[]
        Unorganised ="00 00 19 01 32 02 1A C6 4B C7 1B 68 33 EE DF 03 64 04 E0 0E 34 8D 81 EF 4C 71 08 C8 F8 69 1C C1 7D C2 1D B5 F9 B9 27 6A 4D E4 A6 72 9A C9 09 78 65 2F 8A 05 21 0F E1 24 12 F0 82 45 35 93 DA 8E 96 8F DB BD 36 D0 CE 94 13 5C D2 F1 40 46 83 38 66 DD FD 30 BF 06 8B 62 B3 25 E2 98 22 88 91 10 7E 6E 48 C3 A3 B6 1E 42 3A 6B 28 54 FA 85 3D BA 2B 79 0A 15 9B 9F 5E CA 4E D4 AC E5 F3 73 A7 57 AF 58 A8 50 F4 EA D6 74 4F AE E9 D5 E7 E6 AD E8 2C D7 75 7A EB 16 0B F5 59 CB 5F B0 9C A9 51 A0 7F 0C F6 6F 17 C4 49 EC D8 43 1F 2D A4 76 7B B7 CC BB 3E 5A FB 60 B1 86 3B 52 A1 6C AA 55 29 9D 97 B2 87 90 61 BE DC FC BC 95 CF CD 37 3F 5B D1 53 39 84 3C 41 A2 6D 47 14 2A 9E 5D 56 F2 D3 AB 44 11 92 D9 23 20 2E 89 B4 7C B8 26 77 99 E3 A5 67 4A ED DE C5 31 FE 18 0D 63 8C 80 C0 F7 70 07 "
        ##
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
            Lbox.append(row)
        ##################################################
            #let me lay down the law
            # if the value *the multiplyer is >255 the  do the stupud stuff with the e and l lookep tables
            #im not going to enjoy this am I
            #but eh
            # an encryptor isnt going to write itself
        #########################################################
        finished =[]
        for i in range(len(shifted[0])):#should be 8 
            column =[shifted[0][i],shifted[1][i],shifted[2][i],shifted[3][i]] #first column
            for k in range(0,4):
                row = multiplyer[k]
                Dlist=[]
                for j in range(0,4):
                    if row[j] =="01":
                        d = column[j]
                    elif column[j] =="00":
                        d =column[j]
                    else:

                        a =str(LookUp2(column[j],Lbox))
                        b =str(LookUp2(row[j],Lbox))
                        c =int(a,16)+int(b,16)
                        if c >255:
                            c =c-255
                        c =resolve(hex(c))
                        if len(c)==1:
                            c ="0"+c
                        d =LookUp2(c,Ebox)
                    d =resolve(bin(int(d,16)))
                    d ="0"*(8-len(d))+d
                    Dlist.append(d)

                final =xor(xor(Dlist[0],Dlist[1]),xor(Dlist[2],Dlist[3]))
                final =(resolve(bin(int(final,2))))
                if len(final)<8:
                    final ="0"*(8-len(final))+final
                finished.append(str(final))
                
        row1=finished[0]+finished[4]+finished[8]+  finished[12]+finished[16]+finished[20]+finished[24]+finished[28]
        row2=finished[1]+finished[5]+finished[9]+  finished[13]+finished[17]+finished[21]+finished[25]+finished[29]
        row3=finished[2]+finished[6]+finished[10]+finished[14]+finished[18]+finished[22]+finished[26]+finished[30]
        row4=finished[3]+finished[7]+finished[11]+finished[15]+finished[19]+finished[23]+finished[27]+finished[31]
        #########################################################################
        finished =row1+row2+row3+row4

        chunk =finished
        if len(chunk) < 256:  
            chunk ="0"*(256-len(chunk))+finished
    return chunk


def decrypt(chunk,keys):
    for f in range(0,15):
        #decrypt it
        #trust me there are differences
        #no copy paste here
        #i love AES
        HexChunk =resolve(hex(int(chunk,2)))

        if len(HexChunk) <64:
            HexChunk ="0"*(64-len(HexChunk))+HexChunk 
        HexList =[]

        for i in range(0,32):
            HexList.append(HexChunk[i*2]+HexChunk[1+i*2])

        shifted =[]
        for i in range(0,4):
            row =[]
            for j in range(0,8):
                row.append(HexList[i*8+j])
            shifted.append(row)
        ###########################################################################################################################################
        #44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444#
        ###########################################################################################################################################
        multiplyer =[["0E","0B","0D","09"],["09","0E","0B","0D"],["0D","09","0E","0B"],["0B","0D","09","0E"]]
        ##################################################
        #e table creation
        ##################################################
        Ebox =[]
        Unorganised ="01 03 05 0F 11 33 55 FF 1A 2E 72 96 A1 F8 13 35 5F E1 38 48 D8 73 95 A4 F7 02 06 0A 1E 22 66 AA E5 34 5C E4 37 59 EB 26 6A BE D9 70 90 AB E6 31 53 F5 04 0C 14 3C 44 CC 4F D1 68 B8 D3 6E B2 CD 4C D4 67 A9 E0 3B 4D D7 62 A6 F1 08 18 28 78 88 83 9E B9 D0 6B BD DC 7F 81 98 B3 CE 49 DB 76 9A B5 C4 57 F9 10 30 50 F0 0B 1D 27 69 BB D6 61 A3 FE 19 2B 7D 87 92 AD EC 2F 71 93 AE E9 20 60 A0 FB 16 3A 4E D2 6D B7 C2 5D E7 32 56 FA 15 3F 41 C3 5E E2 3D 47 C9 40 C0 5B ED 2C 74 9C BF DA 75 9F BA D5 64 AC EF 2A 7E 82 9D BC DF 7A 8E 89 80 9B B6 C1 58 E8 23 65 AF EA 25 6F B1 C8 43 C5 54 FC 1F 21 63 A5 F4 07 09 1B 2D 77 99 B0 CB 46 CA 45 CF 4A DE 79 8B 86 91 A8 E3 3E 42 C6 51 F3 0E 12 36 5A EE 29 7B 8D 8C 8F 8A 85 94 A7 F2 0D 17 39 4B DD 7C 84 97 A2 FD 1C 24 6C B4 C7 52 F6 01 "
        ##
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
            Ebox.append(row)

        ##################################################
        #l table creation
        ##################################################
        Lbox =[]
        Unorganised ="00 00 19 01 32 02 1A C6 4B C7 1B 68 33 EE DF 03 64 04 E0 0E 34 8D 81 EF 4C 71 08 C8 F8 69 1C C1 7D C2 1D B5 F9 B9 27 6A 4D E4 A6 72 9A C9 09 78 65 2F 8A 05 21 0F E1 24 12 F0 82 45 35 93 DA 8E 96 8F DB BD 36 D0 CE 94 13 5C D2 F1 40 46 83 38 66 DD FD 30 BF 06 8B 62 B3 25 E2 98 22 88 91 10 7E 6E 48 C3 A3 B6 1E 42 3A 6B 28 54 FA 85 3D BA 2B 79 0A 15 9B 9F 5E CA 4E D4 AC E5 F3 73 A7 57 AF 58 A8 50 F4 EA D6 74 4F AE E9 D5 E7 E6 AD E8 2C D7 75 7A EB 16 0B F5 59 CB 5F B0 9C A9 51 A0 7F 0C F6 6F 17 C4 49 EC D8 43 1F 2D A4 76 7B B7 CC BB 3E 5A FB 60 B1 86 3B 52 A1 6C AA 55 29 9D 97 B2 87 90 61 BE DC FC BC 95 CF CD 37 3F 5B D1 53 39 84 3C 41 A2 6D 47 14 2A 9E 5D 56 F2 D3 AB 44 11 92 D9 23 20 2E 89 B4 7C B8 26 77 99 E3 A5 67 4A ED DE C5 31 FE 18 0D 63 8C 80 C0 F7 70 07 "
        ##
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
            Lbox.append(row)
        ##################################################
            #let me lay down the law
            # if the value *the multiplyer is >255 the  do the stupud stuff with the e and l lookep tables
            #im not going to enjoy this am I
            #but eh
            # an encryptor isnt going to write itself
        #########################################################
        finished =[]
        for i in range(0,8):#should be 8 
            column =[shifted[0][i],shifted[1][i],shifted[2][i],shifted[3][i]] #first column

            for k in range(0,4):
                row = multiplyer[k]
                Dlist=[]
                for j in range(0,4):
                    if row[j] =="01":
                        d = column[j]
                    elif column[j] =="00":
                        d =column[j]
                    else:

                        a =str(LookUp2(column[j],Lbox))
                        b =str(LookUp2(row[j],Lbox))
                        c =int(a,16)+int(b,16)
                        if c >255:
                            c =c-255
                        c =resolve(hex(c))
                        if len(c)==1:
                            c ="0"+c
                        d =LookUp2(c,Ebox)
                    d =resolve(bin(int(d,16)))
                    d ="0"*(8-len(d))+d
                    Dlist.append(d)
                final =xor(xor(Dlist[0],Dlist[1]),xor(Dlist[2],Dlist[3]))
                final =(resolve(bin(int(final,2))))
                if len(final)<8:
                    final ="0"*(8-len(final))+final
                finished.append(str(final))
        row1=finished[0]+finished[4]+finished[8]+  finished[12]+finished[16]+finished[20]+finished[24]+finished[28]
        row2=finished[1]+finished[5]+finished[9]+  finished[13]+finished[17]+finished[21]+finished[25]+finished[29]
        row3=finished[2]+finished[6]+finished[10]+finished[14]+finished[18]+finished[22]+finished[26]+finished[30]
        row4=finished[3]+finished[7]+finished[11]+finished[15]+finished[19]+finished[23]+finished[27]+finished[31]
        finished =row1+row2+row3+row4
        

        HexChunk =resolve(hex(int(finished,2)))


        if len(HexChunk) <64:
            HexChunk ="0"*(64-len(HexChunk))+HexChunk 
        HexList =[]


        ###########################################################################################################################################
        #33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333#
        ###########################################################################################################################################
        for i in range(0,32):
            HexList.append(HexChunk[i*2]+HexChunk[1+i*2])

        shifted =[]
        for i in range(0,4):
            row =[]
            for j in range(0,8):
                row.append(HexList[i*8+j])
            shifted.append(row)


        Unshifted =[]
        for i in range(4):
            row = shifted[i]

            for j in range(i):
                value =row[-1]
                del row[-1]
                row.insert(0,value)

            Unshifted.append(row)
        HexList =[]
        for i in range(len(Unshifted)):
            for j in range(len(Unshifted[i])):
                HexList.append(Unshifted[i][j])


        value =HexList[0]
        del HexList[0]
        HexList.append(value)


        ###########################################################################################################################################
        #22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222#
        ###########################################################################################################################################
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
        for i in range(len(HexList)):
            temp = LookUp(HexList[i],Sbox)
            TempState1.append(temp)
        ###########################################################################################################################################
        #11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111#
        ###########################################################################################################################################
        chunk =""
        for i in range(len(TempState1)):
            a =str(resolve(bin(int(TempState1[i],16))))
            a ="0"*(8-len(a))+a
            chunk =chunk+a
        #first we are going to xor the chunk with our first round key (this is a prototype so for ease the same key is used all 5 times (theoretically this could happen) (its just 1/(256!x15))
        SampleKey =keys[14-f]

        c=str(xor(chunk,SampleKey))
        chunk =c
    return chunk
