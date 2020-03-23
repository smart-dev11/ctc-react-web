/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import { getJobs, jobsSelector, GET_JOBS } from '../../store/jobs';
import {
  positionsSelector,
  getPositions,
  GET_POSITIONS
} from '../../store/positions';
import { createLoadingSelector } from '../../store/loading';
import NoJobs from './NoJobs';
import EditPosition from './EditPosition';
import PositionTab from './PositionTab';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import Link from '../../components/Link';
import Tab from '../../components/Tab';
import Job from './Job';

export default () => {
  const { theme } = useThemeUI();
  const dispatch = useDispatch();
  const jobs = useSelector(jobsSelector);
  const positions = useSelector(positionsSelector);
  const loading = useSelector(createLoadingSelector([GET_JOBS, GET_POSITIONS]));
  const [editingIndex, setEditingIndex] = useState(0);
  const [positionName, setPositionName] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getPositions());
  }, [dispatch]);

  const savePosition = () => {};

  return (
    <Page>
      <PageTitle>Saved Jobs</PageTitle>
      {loading ? (
        <div
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <HashLoader color={theme.colors.primary}></HashLoader>
        </div>
      ) : (
        <Fragment>
          <div sx={{ mt: 4 }}>
            {positions.map((position, index) => (
              <PositionTab
                active={tabIndex === index}
                key={position.id}
                position={position}
                onClick={() => setTabIndex(index)}
              ></PositionTab>
            ))}
            {editingIndex < 0 ? (
              <EditPosition
                position={positionName}
                onPositionChange={setPositionName}
                onSave={savePosition}
                onClose={() => setEditingIndex(0)}
              ></EditPosition>
            ) : (
              <Tab>
                <Link color="primary" onClick={() => setEditingIndex(-1)}>
                  <i className="fas fa-plus" sx={{ mr: 1 }}></i> Add Position
                </Link>
              </Tab>
            )}
          </div>
          {jobs.length > 0 ? (
            <div
              sx={{
                boxShadow: 'medium',
                flex: 1,
                backgroundColor: 'white'
              }}
            >
              {jobs.map((job, index) => (
                <Job
                  key={job.id}
                  job={job}
                  sx={{
                    borderTop: index > 0 ? '1px solid' : '',
                    borderTopColor: 'border'
                  }}
                ></Job>
              ))}
            </div>
          ) : (
            <NoJobs></NoJobs>
          )}
        </Fragment>
      )}
    </Page>
  );
};
