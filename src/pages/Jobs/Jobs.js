/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState, Fragment, useRef } from 'react';
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
  const [editId, setEditId] = useState(0);
  const [text, setText] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const editRef = useRef();

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getPositions()).then(({ value }) => {
      if (value.length) {
        setSelectedId(value[0].id);
      }
    });
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
            {positions.map(position =>
              editId === position.id ? (
                <EditPosition
                  key={position.id}
                  position={text}
                  onPositionChange={setText}
                  onSave={savePosition}
                  onClose={() => setEditId(0)}
                  ref={editRef}
                ></EditPosition>
              ) : (
                <PositionTab
                  sx={{ opacity: editId === 0 ? 1 : 0.5 }}
                  active={selectedId === position.id}
                  key={position.id}
                  position={position}
                  onClick={() => {
                    if (editId !== 0) {
                      return;
                    }
                    if (selectedId === position.id) {
                      setEditId(position.id);
                    } else {
                      setSelectedId(position.id);
                    }
                  }}
                ></PositionTab>
              )
            )}
            {editId < 0 ? (
              <EditPosition
                ref={editRef}
                position={text}
                onPositionChange={setText}
                onSave={savePosition}
                onClose={() => setEditId(0)}
              ></EditPosition>
            ) : (
              <Tab>
                <Link
                  color="primary"
                  onClick={() => {
                    if (editId !== 0) {
                      return;
                    }
                    setEditId(-1);
                  }}
                  disabled={editId !== 0}
                >
                  Add Position
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
