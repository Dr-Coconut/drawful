from Crypto.PublicKey import RSA


def generateKeyPair():
    private_key = RSA.generate(1024)
    public_key = private_key.publickey()
    print(private_key.exportKey(format='PEM'))
    print(public_key.exportKey(format='PEM'))

    return public_key,private_key