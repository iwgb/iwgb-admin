import { gql } from '@apollo/client';

const getAll = gql`
  {
    sorterResults {
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

const add = gql`
  mutation (
    $friendlyName: String!,
    $form: String!,
    $question: String!,
    $conditional: String!,
    $plan: String!,
  ) {
    createSorterResult(input: {
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

export default {
  getAll,
  update,
  remove,
  add,
};
