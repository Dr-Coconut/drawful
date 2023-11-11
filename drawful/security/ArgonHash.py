from argon2 import PasswordHasher

def hashPassword(password):
    ph = PasswordHasher()
    hash = ph.hash(password)
    return hash


def verifyPassword(hash,password):
    ph = PasswordHasher()
    try:
        if(ph.verify(hash,password) ==True):
            return True
        else:
            return False
    except:
        return False


#value = hashPassword("test")
#print(verifyPassword(value,"test"))
