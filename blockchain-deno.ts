import { crypto } from 'https://deno.land/std@0.130.0/crypto/mod.ts'
import { encode, decode } from 'https://deno.land/std@0.130.0/encoding/hex.ts'

class Transaction {
  constructor(
    public amount: number,
    public payer: string, // public key of
    public payee: string // also pub. key of
  ) {}

  toString() {
    return JSON.stringify(this)
  }
}

class Block {
  public nonce = Math.round(Math.random() * 1e10)

  constructor(
    public prevHash: string,
    public transaction: Transaction, // in reality multiple transactions are in a block
    public ts = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this)
    const hash = new Uint8Array(
      await crypto.subtle.digest('SHA-256', new Uint8Array(str))
    )
    return new TextDecoder().decode(encode(hash))
  }
}

class Chain {
  public static instance = new Chain()

  chain: Block[]

  constructor() {
    this.chain = [new Block(null, new Transaction(1000, 'genesis', 'dikk'))]
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1]
  }

  // once solution is found for the block, send it to other nodes to verify.
  // if accepted, by those, then can be added to chain
  mine(nonce: number) {
    let solution = 1
    console.log('mining block...')

    while (true) {
      // TODO: md5 hash -- needs arraybuffer like stuff
      const hash = crypto.subtle.digest('SHA-1', nonce + solution)
      const attempt = encode(hash)
      if (attempt.substr(0, 4) === '0000') {
        return solution
      }
      solution += 1
    }
  }

  addBlock(transaction: Transaction, senderPubKey: string, signature: Uint8Array) {
    // TODO: verify transaction w/ public key and signature
    const verifier = ''
    const isValid = true
    if (!isValid) return false
    const newBlock = new Block(this.lastBlock.hash, transaction)
    this.mine(newBlock.nonce)
    this.chain.push(newBlock)
  }
}

class Wallet {
  public publicKey: string // for receiving
  public privateKey: string // for spending

  constructor() {
    const keypair = await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt']
    )
    this.publicKey = JSON.stringify(
      await crypto.subtle.exportKey('jwk', keypair.publicKey)
    )
    this.privateKey = JSON.stringify(
      await crypto.subtle.exportKey('jwk', keypair.privateKey)
    )
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const tx = new Transaction(amount, this.publicKey, payeePublicKey)
    // TODO: sign tx with private key
    const signature = 'sign'
    Chain.instance.addBlock(tx, this.publicKey, signature) // so later can be verified
  }
}

// -------------- EXAMPLE USE
const joe = new Wallet()
const jim = new Wallet()
const zoe = new Wallet()

joe.sendMoney(50, zoe.publicKey)
jim.sendMoney(30, joe.publicKey)
zoe.sendMoney(40, jim.publicKey)
