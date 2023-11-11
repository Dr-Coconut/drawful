from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from rsaKeyGenerator import *
import requests
import os

def encrypt(message,publicKey):
    message = message.encode()
    cipher = PKCS1_OAEP.new(publicKey)
    ciphertext = cipher.encrypt(message)
    return ciphertext

def decrypt(ciphertext,privateKey):
    cipher = PKCS1_OAEP.new(privateKey)
    decrypted_message = cipher.decrypt(ciphertext)
    return decrypted_message


#pub,priv = generateKeyPair()
#print(os.getenv("pub"))
#message ="hello world"
#text = encrypt(message,pub)
#print(text)
#output = decrypt(text,priv)
#print(output)
