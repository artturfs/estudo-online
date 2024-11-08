def operadores (x, y):
    soma = x + y
    div = x / y
    mult = x * y
    sub = x - y
    print("a multiplicação é =", mult)
    print("a subtração é =", sub)
    print("a soma é =",soma)
    print("a divisão é =",div)

def op (x, y):
    soma = x + y
    div = x / y
    mult = x * y
    sub = x - y
    return soma, div, mult, sub

operadores(2,5)
