export const SAVE_POST = (postData) => `
mutation {
  savePost(
    content: "${postData.content}",
    timestamp: "${postData.timestamp}"
  ) {
    id
    content
    timestamp
  }
}`;

export const GET_POSTS = () => `
query {
  getPosts {
    id
    content
    timestamp
  }
}`;
