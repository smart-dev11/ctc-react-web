/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import { getJobs, jobsSelector, GET_JOBS } from '../../store/jobs';
import {
  positionsSelector,
  getPositions,
  GET_POSITIONS,
  addPosition,
  removePosition,
  ADD_POSITION,
  REMOVE_POSITION
} from '../../store/positions';
import { createLoadingSelector } from '../../store/loading';
import NoJobs from './NoJobs';
import EditPosition from './EditPosition';
import PositionTab from './PositionTab';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import Link from '../../components/Link';
import Tab from '../../components/Tab';
import LoadingOverlay from '../../components/LoadingOverlay';
import Job from './Job';

export default () => {
  const { theme } = useThemeUI();
  const dispatch = useDispatch();
  const jobs = useSelector(jobsSelector);
  const positions = useSelector(positionsSelector);
  const loading = useSelector(createLoadingSelector([GET_JOBS, GET_POSITIONS]));
  const positionCrudLoading = useSelector(
    createLoadingSelector([ADD_POSITION, REMOVE_POSITION])
  );
  const [editId, setEditId] = useState(0);
  const [positionName, setPositionName] = useState('');
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getPositions()).then(({ value }) => {
      if (value.length) {
        setActiveId(value[0].id);
      }
    });
  }, [dispatch]);

  const closeEditing = () => {
    setEditId(0);
    setPositionName('');
  };

  const savePosition = async () => {
    await dispatch(addPosition(positionName));
    closeEditing();
  };

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
          <LoadingOverlay loading={positionCrudLoading} spinner={false}>
            <div sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
              {positions.map(position =>
                editId === position.id ? (
                  <EditPosition
                    key={position.id}
                    position={positionName}
                    onPositionChange={setPositionName}
                    onSave={savePosition}
                    onClose={closeEditing}
                  ></EditPosition>
                ) : (
                  <PositionTab
                    active={activeId === position.id}
                    key={position.id}
                    position={position}
                    onClick={() => setActiveId(position.id)}
                    onEditClick={() => setEditId(position.id)}
                    onRemoveClick={() => dispatch(removePosition(position.id))}
                  ></PositionTab>
                )
              )}
              {editId < 0 ? (
                <EditPosition
                  position={positionName}
                  onPositionChange={setPositionName}
                  onSave={savePosition}
                  onClose={closeEditing}
                ></EditPosition>
              ) : (
                <Tab>
                  <Link color="primary" onClick={() => setEditId(-1)}>
                    <i className="fas fa-plus"></i> Add Position
                  </Link>
                </Tab>
              )}
            </div>
          </LoadingOverlay>

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
