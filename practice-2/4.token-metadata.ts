import "dotenv/config";
const connection = new Connection(clusterApiUrl("devnet"));
import { getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const privateKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY as string));
const keyPair = Keypair.fromSecretKey(privateKey);
const sender = keyPair;

console.log(
  `🔑 Our pubic key is: ${sender.publicKey.toBase58()}`
);  

import fs from 'fs';
const tokenMintAddress = fs.readFileSync('./token-mint-address.txt', 'utf-8').trim();

const tokenMintAccount = new PublicKey(
  tokenMintAddress
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const metadataData = {
  name: "sol camp test",
  symbol: "O13",
  // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
  uri: "https://akrd.net/4wzTdb58E-t58t746HUts7smOfdXcC-Qj3_N-g8Hq-Q",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const transaction = new Transaction();
const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: sender.publicKey,
      payer: sender.publicKey,
      updateAuthority: sender.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );
transaction.add(createMetadataAccountInstruction);

await sendAndConfirmTransaction(
  connection,
  transaction,
  [sender]
);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);
console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);

