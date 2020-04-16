/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import JobDetail from '../Jobs/JobDetail';
import { useSelector, useDispatch } from 'react-redux';
import { makeJobSelector, SAVE_JOB, saveJob } from '../../store/jobs';
import Tab from '../../components/Tab';
import CardTitle from './CardTitle';
import EllipsisKeywords from './EllipsisKeywords';
import Description from './Description';
import ResumeEdit from './ResumeEdit';
import Button from '../../components/Button';
import _ from 'lodash';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useThemeUI } from 'theme-ui';
import { makeLoadingSelector } from '../../store/loading';
import LoadingOverlay from '../../components/LoadingOverlay';

const getMatchingKeywords = (keywords, resumeText) =>
  keywords
    .split(', ')
    .filter((keyword) =>
      resumeText.toLowerCase().includes(keyword.toLowerCase())
    );

export default () => {
  const { id } = useParams();
  const { theme } = useThemeUI();
  const job = useSelector(makeJobSelector(id));
  const [resumeText, setResumeText] = useState(job.resume_text);
  const matches = getMatchingKeywords(job.keywords, job.resume_text);
  const [matchingKeywords, setMatchingKeywords] = useState(matches);
  const [missingKeywords, setMissingKeywords] = useState(
    _.difference(job.keywords.split(', '), matches)
  );
  const [isEditing, setIsEditing] = useState(false);
  const isSaving = useSelector(makeLoadingSelector([SAVE_JOB]));
  const dispatch = useDispatch();

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
          {/* <div sx={{ display: 'flex' }}>
            <Tab active sx={{ py: 1, px: 12 }}>
              Resume
            </Tab>
            <Tab sx={{ py: 1, px: 12 }}>ATS Resume</Tab>
          </div> */}
          <div sx={{ pl: 4, fontSize: 2, color: 'darkText', mb: 2 }}>
            Resume Scorecard
          </div>
          <div sx={{ minHeight: 500, boxShadow: 'medium', bg: 'white', p: 5 }}>
            {isEditing ? (
              <div sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={async () => {
                    await dispatch(
                      saveJob({ ...job, resume_text: resumeText })
                    );
                    setIsEditing(false);
                  }}
                >
                  <span sx={{ fontSize: 3, mr: 2 }}>
                    <i className="fas fa-save"></i>
                  </span>
                  Save
                </Button>
                <Button
                  primary={false}
                  onClick={async () => {
                    setResumeText(job.resume_text);
                    setIsEditing(false);
                  }}
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button>Auto Update</Button>
                <div>
                  <Button primary={false} onClick={() => setIsEditing(true)}>
                    <i className="fas fa-pen"></i>
                  </Button>
                  <Button primary={false} sx={{ ml: 2 }}>
                    <i className="fas fa-download"></i>
                  </Button>
                </div>
              </div>
            )}
            <LoadingOverlay loading={isSaving}>
              <div sx={{ mt: 8 }}>
                {isEditing ? (
                  <ResumeEdit
                    value={resumeText}
                    onChange={(e) => {
                      setResumeText(e.target.value);
                      const matches = getMatchingKeywords(
                        job.keywords,
                        e.target.value
                      );
                      setMatchingKeywords(matches);
                      setMissingKeywords(
                        _.difference(job.keywords.split(', '), matches)
                      );
                    }}
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
            </LoadingOverlay>
          </div>
        </div>
      </div>
    </Page>
  );
};
