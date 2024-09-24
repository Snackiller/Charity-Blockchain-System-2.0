import axios from "axios";

import { SAVE_POST, GET_POSTS } from "./forumApi";

const API_URL = "https://cloud.resilientdb.com/graphql";

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

export const savePost = async (postData) => {
  const query = SAVE_POST(postData);
  console.log("GraphQL Query:", query);
  const result = await sendRequest(query);
  console.log("Save Post Result:", result);
  return result;
};

export const getPosts = async () => {
  const query = GET_POSTS();
  console.log("GraphQL Query:", query);
  const result = await sendRequest(query);
  console.log("Get Posts Result:", result);
  return result;
};
