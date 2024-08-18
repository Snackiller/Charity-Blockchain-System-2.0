import axios from "axios";
import { GENERATE_KEYS, POST_TRANSACTION, FETCH_TRANSACTION, SAVE_PROFILE, GET_PROFILE } from "./resDbApi";

const API_URL = "https://cloud.resilientdb.com/graphql";

// this part of code is the only way we can interact with resDB api
export const sendRequest = async (query) => {
  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json",
  };

  const data = {
    query: query,
  };

  try {
    const response = await axios.post(API_URL, data, { headers });
    console.log("API Response:", response);
    return response.data.data;
  } catch (error) {
    console.error("Error in sending request to API: ", error);
    throw error;
  }
};

export const generateKeys = async () => {
  return await sendRequest(GENERATE_KEYS);
};

export const postTransaction = async (metadata, asset) => {
  const query = POST_TRANSACTION(metadata, asset);
  console.log("GraphQL Query:", query);
  const result = await sendRequest(query);
  console.log("Post Transaction Result:", result);
  return result;
};

export const fetchTransactions = async (
  signerPublicKey,
  recipientPublicKey
) => {
  const query = FETCH_TRANSACTION(signerPublicKey, recipientPublicKey);
  return await sendRequest(query);
};


// Shuhao adds
export const saveProfile = async (profileData) => {
  const query = SAVE_PROFILE(profileData);
  return await sendRequest(query);
};

export const getProfile = async (username) => {
  const query = GET_PROFILE(username);
  return await sendRequest(query);
};