import gql from 'graphql-tag';

export default gql`
query ($searchQuery: String = "") {
  listPictures(filter: {
    name: {
      contains: $searchQuery
    }
  }) {
    items {
      id
      name
      visibility
      owner
      createdAt
      file {
        bucket
        region
        key
      }
    }
  }  
}`;
