/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import { getJobs, jobsSelector, GET_JOBS } from '../../store/jobs';
import {
  positionsSelector,
  getPositions,
  addPosition,
  removePosition,
  savePosition,
  GET_POSITIONS,
  ADD_POSITION,
  REMOVE_POSITION,
  SAVE_POSITION
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
    createLoadingSelector([ADD_POSITION, REMOVE_POSITION, SAVE_POSITION])
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
                    onSave={async () => {
                      await dispatch(
                        savePosition({ ...position, name: positionName })
                      );
                      setEditId(0);
                    }}
                    onClose={() => setEditId(0)}
                  ></EditPosition>
                ) : (
                  <PositionTab
                    active={activeId === position.id}
                    key={position.id}
                    position={position}
                    onClick={() => setActiveId(position.id)}
                    onEditClick={() => {
                      setEditId(position.id);
                      setPositionName(position.name);
                    }}
                    onRemoveClick={() =>
                      window.confirm(
                        `Are you sure to delete ${position.name}?`
                      ) && dispatch(removePosition(position.id))
                    }
                  ></PositionTab>
                )
              )}
              {editId < 0 ? (
                <EditPosition
                  position={positionName}
                  onPositionChange={setPositionName}
                  onSave={async () => {
                    await dispatch(addPosition(positionName));
                    setEditId(0);
                  }}
                  onClose={() => setEditId(0)}
                ></EditPosition>
              ) : (
                <Tab>
                  <Link
                    color="primary"
                    onClick={() => {
                      setEditId(-1);

                      setPositionName('');
                    }}
                  >
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
