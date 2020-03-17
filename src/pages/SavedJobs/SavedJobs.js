/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import { getJobs, jobsSelector } from '../../store/jobs';
import NoJobs from './NoJobs';

export default () => {
  const dispatch = useDispatch();
  const jobs = useSelector(jobsSelector);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <Page>
      <PageTitle>Saved Jobs</PageTitle>
      <NoJobs></NoJobs>
    </Page>
  );
};
