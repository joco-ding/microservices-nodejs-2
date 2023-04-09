
import yargs from 'yargs';

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

  export default argv