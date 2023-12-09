import { App } from '@tinyhttp/app';
import sirv from 'sirv';

const app = new App();

// Sirve archivos estáticos desde la carpeta 'public'
app.use(sirv('public'));

// Maneja las solicitudes de rutas específicas
app.get('/', (req, res) => {
 res.sendFile('public/index.html');
});

app.listen(3000, () => {
 console.log('Server is running on http://localhost:3000');
});