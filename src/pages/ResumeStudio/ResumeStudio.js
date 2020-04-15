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
import ResumeEdit from './ResumeEdit';
import { useState } from 'react';
import _ from 'lodash';
import request from '../../utils/request';
import { useEffect } from 'react';

export default () => {
  const { id } = useParams();
  const job = useSelector(makeJobSelector(id));
  const [resumeText, setResumeText] = useState(job.resume_text);
  const [matchingKeywords, setMatchingKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);

  useEffect(() => {
    const caculateKeywords = async () => {
      const { data: resumeKeywords } = await request.post(
        '/jobs/keyword_extract/',
        {
          text: job.resume_text,
        }
      );
      if (!resumeKeywords) return;
      setMatchingKeywords(
        _.intersection(job.keywords.split(', '), resumeKeywords)
      );
      setMissingKeywords(
        _.difference(job.keywords.split(', '), resumeKeywords)
      );
    };
    caculateKeywords();
  }, [job.resume_text, job.keywords]);

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
              <CardTitle>
                {matchingKeywords.length} /{' '}
                {matchingKeywords.length + missingKeywords.length}
              </CardTitle>
            </div>
            <EllipsisKeywords keywords={matchingKeywords}></EllipsisKeywords>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                mb: 4,
              }}
            >
              <CardTitle>Missing Keywords</CardTitle>
              <CardTitle>
                {missingKeywords.length} /{' '}
                {matchingKeywords.length + missingKeywords.length}
              </CardTitle>
            </div>
            <EllipsisKeywords keywords={missingKeywords}></EllipsisKeywords>
          </div>
          <div sx={{ pl: 4, fontSize: 2, color: 'darkText', mb: 2, mt: 6 }}>
            Job Description
          </div>
          <div sx={{ boxShadow: 'medium', bg: 'white', p: 6 }}>
            <CardTitle>{job.title}</CardTitle>
            <Description
              description={job.description}
              keywords={job.keywords.split(', ')}
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
          <div sx={{ minHeight: 500, boxShadow: 'medium', bg: 'white' }}>
            <ResumeEdit
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            ></ResumeEdit>
          </div>
        </div>
      </div>
    </Page>
  );
};
