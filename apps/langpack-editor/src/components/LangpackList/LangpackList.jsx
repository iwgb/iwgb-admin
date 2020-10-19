import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import http from '../../utils/axios';
import LangpackListActions from './LangpackListActions';
import Langpack from '../Langpack/Langpack';

const LangpackList = () => {
  const [langpacks, setLangpacks] = useState([]);

  useEffect(() => {
    http.get('/all')
      .then(({ data: { files } }) => {
        setLangpacks(files.reduce((processedFiles, url) => {
          const fileUrlParts = url.split('/');
          const language = fileUrlParts.pop().replace('.json', '');
          const langpackName = fileUrlParts.pop();
          return {
            ...processedFiles,
            [langpackName]: {
              ...processedFiles[langpackName],
              [language]: url,
            },
          };
        }, {}));
      })
      .catch(() => toast('Failed to load the list of langpacks'));
  }, []);

  return (
    <div className="my-5">
      <div className="row my-3 px-sm-3 justify-content-between align-items-center">
        <div className="col-xs-12 col-sm-7 my-3 my-sm-0">
          <h2 className="m-0">
            <FormattedMessage id="header.title" />
          </h2>
        </div>
        <div className="col-xs-12 col-sm-5 d-flex justify-content-sm-end">
          <LangpackListActions />
        </div>
      </div>
      {
        Object.keys(langpacks).length === 0
          ? (
            <SkeletonTheme color="#f7f7f7">
              {[...new Array(15)].fill().map(() => (
                <Skeleton height="3rem" className="my-1" />
              ))}
            </SkeletonTheme>
          )
          : Object.keys(langpacks).map((langpackName) => (
            <Langpack
              key={langpackName}
              name={langpackName}
              languages={Object.keys(langpacks[langpackName]).map((language) => ({
                language,
                url: langpacks[langpackName][language],
              }))}
            />
          ))
      }
    </div>
  );
};

export default LangpackList;
