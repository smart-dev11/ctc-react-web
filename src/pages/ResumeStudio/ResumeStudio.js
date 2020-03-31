/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import Job from '../Jobs/Job';
import { useSelector } from 'react-redux';
import { makeJobSelector } from '../../store/positions';

export default () => {
  const { positionId, jobId } = useParams();
  const job = useSelector(makeJobSelector(positionId, jobId));
  console.log(job);
  return (
    <Page>
      <PageTitle>Resume Studio</PageTitle>
      <Job job={job}></Job>
    </Page>
  );
};
