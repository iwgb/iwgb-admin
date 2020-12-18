import { gql } from '@apollo/client';

const list = gql`
  query {
    objects @rest(type: "Object", path: "files") {
      id,
      key,
      size,
      lastModified,
    }
  }
`;

const destroy = gql`
  mutation ($id: String!) {
    createObject(id: $id, input: {}) @rest(
      type: "Object",
      path: "files/{args.id}",
      method: "delete",
    ) {
      id,
    }
  }
`;

export default {
  list,
  destroy,
};
