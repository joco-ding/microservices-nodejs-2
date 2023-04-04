import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import yargs from 'yargs';
import layanan from './layanan/layanan'
import login from './layanan/login'
import gateway from './gateway'

interface Args {
  port: number;
  nama: string;
}

const argv = yargs(process.argv.slice(2))
  .options({
    port: {
      alias: 'p',
      type: 'number',
      description: 'Angka port',
      default: 3000,
    },
    nama: {
      alias: 'n',
      type: 'string',
      description: 'Nama API',
      default: 'Gateway',
    },
  })
  .help()
  .alias('help', 'h')
  .parse() as Args;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'))

if (argv.nama === 'Gateway') {
  app.use('/', gateway)
} else {
  app.use('/api/login', login)
  app.use('/api', layanan)
}

app.listen(argv.port, () => {
  console.log(`API ${argv.nama} sudah berjalan pada port ${argv.port}`);
});
