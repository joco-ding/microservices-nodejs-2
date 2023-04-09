import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import layanan from './layanan/layanan'
import login from './layanan/login'
import gateway from './gateway'
import argv from './argv';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'))

if (argv.nama === 'Gateway') {
  app.use('/api', gateway)
} else {
  app.use('/login', login)
  app.use('/', layanan)
}

app.listen(argv.port, () => {
  console.log(`API ${argv.nama} sudah berjalan pada port ${argv.port}`);
});
