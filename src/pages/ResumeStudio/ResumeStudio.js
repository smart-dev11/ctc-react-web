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
import Button from '../../components/Button';
import { useState, Fragment } from 'react';
import _ from 'lodash';
import request from '../../utils/request';
import { useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import HashLoader from 'react-spinners/HashLoader';
import 'react-circular-progressbar/dist/styles.css';
import delay from 'p-min-delay';
import { useThemeUI } from 'theme-ui';

export default () => {
  const { id } = useParams();
  const { theme } = useThemeUI();
  const job = useSelector(makeJobSelector(id));
  const [resumeText, setResumeText] = useState(job.resume_text);
  const [matchingKeywords, setMatchingKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [isCaculating, setIsCaculating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const caculateKeywords = async () => {
      setIsCaculating(true);
      try {
        const { data: resumeKeywords } = await delay(
          request.post('/jobs/keyword_extract/', {
            text: job.resume_text,
          }),
          1500
        );
        setMatchingKeywords(
          _.intersection(job.keywords.split(', '), resumeKeywords)
        );
        setMissingKeywords(
          _.difference(job.keywords.split(', '), resumeKeywords)
        );
      } catch (e) {}
      setIsCaculating(false);
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
            {isCaculating ? (
              <div sx={{ display: 'flex', justifyContent: 'center', py: 7 }}>
                <HashLoader color={theme.colors.primary}></HashLoader>
              </div>
            ) : (
              <Fragment>
                <div
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 6,
                    mb: 5,
                  }}
                >
                  <CircularProgressbar
                    value={
                      (matchingKeywords.length * 100) /
                      (matchingKeywords.length + missingKeywords.length)
                    }
                    text={`${
                      (matchingKeywords.length * 100) /
                      (matchingKeywords.length + missingKeywords.length)
                    }%`}
                    styles={buildStyles({
                      pathColor: theme.colors.primary,
                      textColor: theme.colors.primary,
                      trailColor: theme.colors.placeholder,
                    })}
                    strokeWidth={6}
                    sx={{ width: '60%' }}
                  />
                </div>
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
                <EllipsisKeywords
                  keywords={matchingKeywords}
                ></EllipsisKeywords>
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
              </Fragment>
            )}
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
          <div sx={{ minHeight: 500, boxShadow: 'medium', bg: 'white', p: 5 }}>
            <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button>Auto Update</Button>
              <div>
                {isEditing ? (
                  <Button primary={false} onClick={() => setIsEditing(false)}>
                    Save
                  </Button>
                ) : (
                  <Button primary={false} onClick={() => setIsEditing(true)}>
                    <div>
                      <i className="fas fa-pen"></i>
                    </div>
                  </Button>
                )}
                <Button primary={false} sx={{ ml: 2 }}>
                  <i className="fas fa-download"></i>
                </Button>
              </div>
            </div>
            <div sx={{ mt: 8 }}>
              {isEditing ? (
                <ResumeEdit
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                ></ResumeEdit>
              ) : (
                <div
                  sx={{
                    fontSize: 2,
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                    mb: 0,
                  }}
                >
                  {job.resume_text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
