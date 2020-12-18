import axios from 'axios';

const upload = (
  url,
  data = {},
  onUploadProgress = () => {}
) => axios.put(url, data, {
  headers: { 'x-amz-acl': 'public-read' },
  onUploadProgress,
});

export default { upload };
