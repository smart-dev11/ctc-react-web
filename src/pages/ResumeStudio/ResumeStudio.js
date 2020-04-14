/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import JobDetail from '../Jobs/JobDetail';
import { useSelector } from 'react-redux';
import { makeJobSelector } from '../../store/jobs';
import Tab from '../../components/Tab';
import CardTitle from './CardTitle';
import EllipsisKeywords from './EllipsisKeywords';
import Description from './Description';

export default () => {
  const { id } = useParams();
  const job = useSelector(makeJobSelector(id));

  // const getHighlight = (html, keywords) => {
  //   return keywords
  //     .filter(
  //       (keyword) =>
  //         !_.some(
  //           keywords,
  //           (otherKeyword) =>
  //             otherKeyword.includes(keyword) && otherKeyword !== keyword
  //         )
  //     )
  //     .reduce((result, keyword) => {
  //       return result.replace(
  //         new RegExp(keyword, 'ig'),
  //         `<span class="keyword-highlight">${keyword}</span>`
  //       );
  //     }, html);
  // };

  return (
    <Page>
      <PageTitle>Resume Studio</PageTitle>
      <div
        sx={{
          boxShadow: 'medium',
          backgroundColor: 'white',
          p: 5,
          mb: 12,
        }}
      >
        <JobDetail job={job}></JobDetail>
      </div>
      <div
        sx={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gridGap: 10 }}
      >
        <div>
          <div sx={{ pl: 4, fontSize: 2, color: 'darkText', mb: 2 }}>
            Resume Scorecard
          </div>
          <div sx={{ boxShadow: 'medium', backgroundColor: 'white', p: 6 }}>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                mb: 4,
              }}
            >
              <CardTitle>Matching Keywords</CardTitle>
              <CardTitle>8 / 15</CardTitle>
            </div>
            <EllipsisKeywords keywords={job.keywords}></EllipsisKeywords>
          </div>
          <div sx={{ pl: 4, fontSize: 2, color: 'darkText', mb: 2, mt: 6 }}>
            Job Description
          </div>
          <div sx={{ boxShadow: 'medium', bg: 'white', p: 6 }}>
            <CardTitle>Digital Marketing Manager</CardTitle>
            <Description
              description={job.description}
              sx={{ mt: 2 }}
            ></Description>
          </div>
        </div>
        <div>
          <div sx={{ display: 'flex' }}>
            <Tab active sx={{ py: 1, px: 12 }}>
              Resume
            </Tab>
            <Tab sx={{ py: 1, px: 12 }}>ATS Resume</Tab>
          </div>
          <div sx={{ minHeight: 500, boxShadow: 'medium', bg: 'white' }}></div>
        </div>
      </div>
    </Page>
  );
};
