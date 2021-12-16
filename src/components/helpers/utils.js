import * as hdcore from 'hdcore-ts';

const SOLANA_COIN_TYPE = '501';
const acc = hdcore.account;
const transaction = acc.getTransaction(SOLANA_COIN_TYPE);

export function getAddress(pubkey) {
  return acc.getAddress(pubkey, SOLANA_COIN_TYPE);
}

export async function getBalance(pubkey) {
  const balance = await transaction.get_balance(pubkey);
  return balance;
}

export async function getAirdrop(pubkey) {
  const result = await transaction.airdrop_one(pubkey);
  return result;
}

export async function sendTransaction(pubkey, privkey, receiverAddress, amount) {
  const result = await transaction.send(pubkey, privkey, receiverAddress, amount);
  return result;
}