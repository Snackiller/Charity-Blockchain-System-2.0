export const GENERATE_KEYS = `
mutation{
    generateKeys{
      publicKey,
      privateKey
    }
  }
`;

export const POST_DONATION = (
  donate_detail,
  asset,
  donate_amount
) => `mutation {
    postTransaction(data: {
    operation: "CREATE",
    amount: "${donate_amount}",
    signerPublicKey: "${donate_detail?.signerPublicKey}",
    signerPrivateKey: "${donate_detail?.signerPrivateKey}",
    recipientPublicKey: "recipientPublicKey", // fixed one recipient
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
    getSpecificDonation(filter: {
    ownerPublicKey:"${signerPublicKey}"
    recipientPublicKey:"${recipientPublicKey}"
    }){
    asset
    }
  }`;
