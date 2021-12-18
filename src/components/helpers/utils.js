import * as hdcore from 'hdcore-ts';

const coin_type = '501';
const coinType = 501;
const DEFAULT_CHILD = 2021;
const acc = hdcore.account;
const transaction = acc.getTransaction(coin_type);

export function getAddress(pubkey) {
  return acc.getAddress(pubkey, coin_type);
}

export function getPath(index = DEFAULT_CHILD) {
  return acc.getPath(coinType, index);
}

export function createMasterWallet(seed) {
  return acc.createMasterAccount(coin_type, seed);
}

export function createChildWallet(seed, index = DEFAULT_CHILD) {
  const path = getPath(index);
  return acc.createChildAccount(coin_type, seed, path);
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