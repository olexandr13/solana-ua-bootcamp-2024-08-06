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
import { mintTo } from "@solana/spl-token";

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

import fs from 'fs';
const tokenMintAddress = fs.readFileSync('./token-mint-address.txt', 'utf-8').trim();

const tokenMintAccount = new PublicKey(
  tokenMintAddress
);

// read token account address from file
const recepientAddress = fs.readFileSync('./token-account-address.txt', 'utf-8').trim();

const recipientAssociatedTokenAccount = new PublicKey(
  recepientAddress
);

const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  sender,
  13 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);

