import { Keypair } from "@solana/web3.js"
import 'dotenv/config';

let keypair = Keypair.generate();
let counter = 0;
while (!keypair.publicKey.toString().toLowerCase().startsWith('kumeka')) {
  counter++;
  keypair = Keypair.generate();
}

console.log('FOUND!', keypair.publicKey.toString(), ':', keypair.secretKey.toString(), 'in', counter, 'tries');