import { GraphQLClient } from 'graphql-request';
import { API_BASE_URL, REQUEST_CONFIG } from '../constants/api.constants';

const graphql = new GraphQLClient(
  `${API_BASE_URL}/graphql`,
  REQUEST_CONFIG
);

const getAll = () => graphql.request(`
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
`);

const get = (id) => graphql.request(`
  query ($id: ID) {
    sorterResults(id: $id) {
      identifier
      friendlyName
      form
      question
      conditional
      plan
    }
  }
`, { id });

const update = ({
  identifier,
  friendlyName,
  form,
  question,
  conditional,
  plan,
}) => new Promise((resolve, reject) => graphql.request(`
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
      identifier
    }
  }
`, {
  id: identifier,
  friendlyName,
  form,
  question,
  conditional,
  plan,
})
  .then((response) => resolve(response))
  .catch((error) => reject(error))
);

const remove = (id) => graphql.request(`
  mutation (
    $id: ID!,
  ) {
    deleteSorterResult(id: $id)
  }
`, { id });

export default {
  get,
  getAll,
  update,
  remove,
};
