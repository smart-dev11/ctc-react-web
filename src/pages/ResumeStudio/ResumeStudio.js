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
import parse from 'html-react-parser';
import EllipableKeywords from './EllipableKeywords';

export default () => {
  const { id } = useParams();
  const job = useSelector(makeJobSelector(id));

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
        sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gridGap: 10 }}
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
            <EllipableKeywords keywords={job.keywords}></EllipableKeywords>
          </div>
          <div sx={{ pl: 4, fontSize: 2, color: 'darkText', mb: 2, mt: 6 }}>
            Job Description
          </div>
          <div sx={{ boxShadow: 'medium', bg: 'white', p: 6 }}>
            <CardTitle>Digital Marketing Manager</CardTitle>
            <div sx={{ fontSize: 2, mt: 3 }}>{parse(job.description_html)}</div>
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
