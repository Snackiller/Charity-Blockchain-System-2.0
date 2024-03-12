// this is the only way can can generate key
export const GENERATE_KEYS = `
mutation{
    generateKeys{
      publicKey,
      privateKey
    }
  }
`;
// this is the only way we can postTransaction
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
      metadata
      operation
      id
      version
      amount
      uri
      type
      asset
      publicKey
      
    }
  }`;

// transaction id
// donate title
// donate amount
// donate detail
