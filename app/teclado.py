from pynput import keyboard
import os

archivo = "./storage/contador.txt"

# Leer contador inicial
if os.path.exists(archivo):
    with open(archivo, 'r') as f:
        contador = int(f.read().strip())
else:
    contador = 0
    with open(archivo, 'w') as f:
        f.write(str(contador))

def actualizar_archivo():
    with open(archivo, 'w') as f:
        f.write(str(contador))

def on_press(key):
    global contador
    try:
        if key.char == '0':
            contador += 1
            actualizar_archivo()
            print(f"Contador: {contador}")
        elif key.char == '9' and contador > 0:
            contador -= 1
            actualizar_archivo()
            print(f"Contador: {contador}")
    except AttributeError:
        pass

print("Escuchando teclas 0 (incrementar) y 9 (decrementar)... Presiona Ctrl+C para salir")
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()