import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  Keypair,
} from "@solana/web3.js";
import 'dotenv/config';
import { createMint } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

const privateKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY as string));
const keyPair = Keypair.fromSecretKey(privateKey);
const sender = keyPair;
const connection = new Connection(clusterApiUrl("devnet"));

const tokenMint = await createMint(
  connection,
  sender,
  sender.publicKey,
  null,
  2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Token Mint: ${link}`);


// save token address to file
import fs from 'fs';
fs.writeFileSync('./token-mint-address.txt', tokenMint.toString());
