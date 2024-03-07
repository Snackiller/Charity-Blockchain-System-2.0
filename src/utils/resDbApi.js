export const GENERATE_KEYS = `
mutation{
    generateKeys{
      publicKey,
      privateKey
    }
  }
`;

export const POST_DONATION = (metadata, asset) => `mutation {
    postTransaction(data: {
    operation: "CREATE",
    amount: 1,
    signerPublicKey: "${metadata?.signerPublicKey}",
    signerPrivateKey: "${metadata?.signerPrivateKey}",
    recipientPublicKey: "${metadata?.recipientPublicKey}", // fixed one recipient
    asset: """{
      "data": ${asset},    
    }
    """
    }){
    id // return id
    }
  }`;

// filter based on "signerPublicKey, recipientPublicKey"
export const FETCH_DONATION = (signerPublicKey, recipientPublicKey) => `query { 
  getFilteredTransactions(filter: {
    ownerPublicKey:"${signerPublicKey}"
    recipientPublicKey:"${recipientPublicKey}"
    }){
      id
      amount
      asset
    }
  }`;

// assume id is the key, amount is the donate amount
// asset is the descrpition of the donation event
