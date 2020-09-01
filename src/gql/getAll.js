import gql from 'graphql-tag';

export default gql`
    {
    sorterResults(sorting: {
      field: friendlyName,
      order: ASC,
    }) {
      identifier
      friendlyName
      form
      question
      conditional
      plan
    }
  }
`;
