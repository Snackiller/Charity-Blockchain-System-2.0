import axios from "axios";
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

  const response = await axios.post(
    "https://cloud.resilientdb.com/graphql",
    data,
    { headers }
  );
  return response.data;
};
