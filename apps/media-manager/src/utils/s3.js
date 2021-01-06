import axios from 'axios';

const upload = (
  url,
  file = {},
  onUploadProgress = () => {}
) => axios.put(url, file, {
  headers: {
    'x-amz-acl': 'public-read',
    'content-type': file.type,
  },
  onUploadProgress,
});

export default { upload };
