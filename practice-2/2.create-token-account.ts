import "dotenv/config";
import 'dotenv/config';
const privateKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY as string));
const keyPair = Keypair.fromSecretKey(privateKey);
const sender = keyPair;
const connection = new Connection(clusterApiUrl("devnet"));


import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

console.log(
  `🔑 Our pubic key is: ${sender.publicKey.toBase58()}`
);

// read token mint address from file
import fs from 'fs';
const tokenMintAddress = fs.readFileSync('./token-mint-address.txt', 'utf-8').trim();

const tokenMintAccount = new PublicKey(
  tokenMintAddress
);
const recipient = new PublicKey("F5sW8U5is1ECpAfXpqWKELznU7MnTGdtd8NKV1uWV8VS");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token account: ${link}`);

// save token account address to file
fs.writeFileSync('./token-account-address.txt', tokenAccount.address.toBase58());

