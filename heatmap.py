import matplotlib.pyplot as plt
import numpy as np
from matplotlib.image import imread

# Cargar la imagen del mapa
map_image = imread('mapa.png')

# Datos de ejemplo para el heatmap
data = np.random.rand(10, 10)

# Crear el heatmap
plt.imshow(map_image, extent=[0, 10, 0, 10])  # Mostrar la imagen del mapa
plt.imshow(data, cmap='hot', alpha=0.5, interpolation='nearest', extent=[0, 10, 0, 10])  # Mostrar el heatmap

# Ajustar la escala de los ejes
plt.xlim(0, 10)
plt.ylim(0, 10)

# Añadir barra de color
plt.colorbar()

# Mostrar el resultado
plt.show()
