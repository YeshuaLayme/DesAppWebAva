def generar_multiplos(numero, n):
    return [ numero * i for i in range(1, n + 1)]

print(generar_multiplos(7, 10))
print(generar_multiplos(12, 7))