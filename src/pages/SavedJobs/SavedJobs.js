/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import Link from '../../components/Link';
import { getJobs, jobsSelector } from '../../store/jobs';
import NoJobs from './NoJobs';
import Moment from 'react-moment';

export default () => {
  const dispatch = useDispatch();
  const jobs = useSelector(jobsSelector);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  console.log(jobs);

  return (
    <Page>
      <PageTitle>Saved Jobs</PageTitle>
      {jobs.length > 0 ? (
        <Fragment>
          <div
            sx={{
              py: 2,
              px: 5,
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 120px'
            }}
          >
            <div sx={{ color: 'darkText', fontSize: 3 }}>Position</div>
            <div sx={{ color: 'darkText', fontSize: 3 }}>Date Applied</div>
            <div></div>
          </div>
          <div
            sx={{
              boxShadow: 'medium',
              flex: 1,
              backgroundColor: 'white'
            }}
          >
            {jobs.map((job, index) => (
              <div
                key={job.id}
                sx={{
                  p: 5,
                  borderTop: index > 0 ? '1px solid' : '',
                  borderTopColor: 'border',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 120px',
                  alignItems: 'center'
                }}
              >
                <div
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gridGap: 4,
                    alignItems: 'center'
                  }}
                >
                  {job.logo ? (
                    <img
                      src={job.logo}
                      alt={job.title}
                      sx={{ width: 96, height: 96 }}
                    ></img>
                  ) : (
                    <div sx={{ width: 96, height: 96, bg: 'black' }}></div>
                  )}

                  <div>
                    <div sx={{ fontSize: 4, color: 'darkText' }}>
                      {job.title}
                    </div>
                    <div sx={{ fontSize: 3, color: 'darkText' }}>
                      {job.company}
                    </div>
                    <div sx={{ fontSize: 3, mt: 1, color: 'text' }}>
                      {job.location}
                    </div>
                  </div>
                </div>
                <div>
                  <Moment format="MMM D, YYYY">{job.created_at}</Moment>
                </div>
                <div
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gridGap: 6,
                    justifyContent: 'center'
                  }}
                >
                  <Link>
                    <i className="fas fa-pen"></i>
                  </Link>
                  <Link>
                    <i className="fas fa-trash"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      ) : (
        <NoJobs></NoJobs>
      )}
    </Page>
  );
};
