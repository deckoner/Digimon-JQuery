import express from 'express';
import path from 'path';

const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(process.cwd(), 'public')));

// Mostrar el archivo index.html cuando se accede a la raíz del servidor
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Escuchar en el puerto 3000
app.listen(3000, () => console.log('El servidor está escuchando en el puerto 3000 http://localhost:3000'));