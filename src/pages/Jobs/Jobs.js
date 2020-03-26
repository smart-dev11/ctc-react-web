/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import {
  positionsSelector,
  getPositions,
  addPosition,
  removePosition,
  savePosition,
  GET_POSITIONS,
  ADD_POSITION,
  REMOVE_POSITION,
  SAVE_POSITION,
  createJobsByPositionIdSelector
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
  const positions = useSelector(positionsSelector);
  const loading = useSelector(createLoadingSelector([GET_POSITIONS]));
  const positionCrudLoading = useSelector(
    createLoadingSelector([ADD_POSITION, REMOVE_POSITION, SAVE_POSITION])
  );
  const [editId, setEditId] = useState(0);
  const [positionName, setPositionName] = useState('');
  const [activeId, setActiveId] = useState(0);
  const jobs = useSelector(createJobsByPositionIdSelector(activeId));

  useEffect(() => {
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
                        savePosition({ id: position.id, name: positionName })
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
                      dispatch(removePosition(position.id)).then(() => {
                        if (activeId === position.id && positions.length > 1) {
                          setActiveId(positions[0].id);
                        }
                      })
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
                <Tab active={positions.length === 0}>
                  <Link
                    color="primary"
                    onClick={() => {
                      setEditId(-1);
                      setPositionName('');
                    }}
                  >
                    <i className="fas fa-plus"></i>
                    {positions.length ? '' : ' Add Position'}
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
                  onRemoveClick={() => alert('Not implemented yet')}
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
