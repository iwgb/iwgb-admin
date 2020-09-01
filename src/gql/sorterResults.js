import gql from 'graphql-tag';

const getAll = gql`
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

const update = gql`
  mutation (
    $id: ID!,
    $friendlyName: String,
    $form: String,
    $question: String,
    $conditional: String,
    $plan: String,
  ) {
    updateSorterResult(id: $id, input: {
      friendlyName: $friendlyName,
      form: $form,
      question: $question,
      conditional: $conditional,
      plan: $plan,
    }) {
      identifier,
      friendlyName,
      form,
      question,
      conditional,
      plan,
    }
  }
`;

const remove = gql`
   mutation (
    $id: ID!,
  ) {
    deleteSorterResult(id: $id)
  }
`;

export default {
  getAll,
  update,
  remove,
};
