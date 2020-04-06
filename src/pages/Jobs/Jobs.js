/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  movePosition,
  MOVE_POSITION,
} from '../../store/positions';
import {
  removeJob,
  uploadResume,
  REMOVE_JOB,
  UPLOAD_RESUME,
  makeJobsSelector,
  changeJobPosition,
  CHANGE_JOB_POSITION,
} from '../../store/jobs';
import { makeLoadingSelector } from '../../store/loading';
import NoJobs from './NoJobs';
import EditPosition from './EditPosition';
import PositionTab from './PositionTab';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import Link from '../../components/Link';
import Tab from '../../components/Tab';
import LoadingOverlay from '../../components/LoadingOverlay';
import Job from './Job';
import ResumeUpload from './ResumeUpload';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UpdateSuggest from './UpdateSuggest';

export default () => {
  const { theme } = useThemeUI();
  const history = useHistory();
  const dispatch = useDispatch();
  const positions = useSelector(positionsSelector);
  const pageLoading = useSelector(makeLoadingSelector([GET_POSITIONS]));
  const positionsLoading = useSelector(
    makeLoadingSelector([
      ADD_POSITION,
      REMOVE_POSITION,
      SAVE_POSITION,
      CHANGE_JOB_POSITION,
      MOVE_POSITION,
    ])
  );
  const jobsLoading = useSelector(
    makeLoadingSelector([
      REMOVE_JOB,
      REMOVE_POSITION,
      UPLOAD_RESUME,
      CHANGE_JOB_POSITION,
    ])
  );
  const [editPositionId, setEditPositionId] = useState(0);
  const [positionName, setPositionName] = useState('');
  const [selectedPositionId, setSelectedPositionId] = useState(0);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadJobId, setUploadJobId] = useState(0);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [proceedUrl, setProceedUrl] = useState('');
  const jobs = useSelector(makeJobsSelector(selectedPositionId));

  useEffect(() => {
    dispatch(getPositions()).then(({ value }) => {
      setSelectedPositionId(parseInt(Object.keys(value.positions)[0]));
    });
  }, [dispatch]);

  const onDragEnd = ({ draggableId, destination: { index } }) => {
    dispatch(movePosition(parseInt(draggableId), index + 1));
  };

  return (
    <DndProvider backend={Backend}>
      <Page>
        <PageTitle>Saved Jobs</PageTitle>
        {pageLoading ? (
          <div
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HashLoader color={theme.colors.primary}></HashLoader>
          </div>
        ) : (
          <Fragment>
            <LoadingOverlay loading={positionsLoading} spinner={false}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {positions.map((position, index) =>
                        editPositionId === position.id ? (
                          <EditPosition
                            key={position.id}
                            position={positionName}
                            onPositionChange={setPositionName}
                            onSave={async () => {
                              await dispatch(
                                savePosition({
                                  id: position.id,
                                  name: positionName,
                                })
                              );
                              setEditPositionId(0);
                            }}
                            onClose={() => setEditPositionId(0)}
                          ></EditPosition>
                        ) : (
                          <Draggable
                            key={position.id}
                            draggableId={`${position.id}`}
                            index={index}
                            isDragDisabled={editPositionId !== 0}
                          >
                            {(provided) => (
                              <PositionTab
                                isDragging={
                                  snapshot.isUsingPlaceholder ||
                                  snapshot.isDraggingOver
                                }
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                                active={selectedPositionId === position.id}
                                key={position.id}
                                position={position}
                                onClick={() =>
                                  setSelectedPositionId(position.id)
                                }
                                onEditClick={() => {
                                  setEditPositionId(position.id);
                                  setPositionName(position.name);
                                }}
                                onRemoveClick={() => {
                                  dispatch(removePosition(position.id)).then(
                                    () => {
                                      if (
                                        selectedPositionId === position.id &&
                                        positions.length > 1
                                      ) {
                                        setSelectedPositionId(positions[0].id);
                                      }
                                    }
                                  );
                                }}
                                onJobDrop={(job) =>
                                  dispatch(changeJobPosition(job, position))
                                }
                              ></PositionTab>
                            )}
                          </Draggable>
                        )
                      )}
                      {!snapshot.isDraggingOver &&
                        !snapshot.isUsingPlaceholder && (
                          <Fragment>
                            {editPositionId < 0 ? (
                              <EditPosition
                                position={positionName}
                                onPositionChange={setPositionName}
                                onSave={async () => {
                                  await dispatch(addPosition(positionName));
                                  setEditPositionId(0);
                                }}
                                onClose={() => setEditPositionId(0)}
                              ></EditPosition>
                            ) : (
                              <Tab active={positions.length === 0}>
                                <Link
                                  color="primary"
                                  onClick={() => {
                                    setEditPositionId(-1);
                                    setPositionName('');
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                  {positions.length ? '' : ' Add Position'}
                                </Link>
                              </Tab>
                            )}
                          </Fragment>
                        )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </LoadingOverlay>
            {jobs.length > 0 ? (
              <LoadingOverlay loading={jobsLoading}>
                <div
                  sx={{
                    boxShadow: 'medium',
                    flex: 1,
                    backgroundColor: 'white',
                  }}
                >
                  {jobs.map((job, index) => (
                    <Job
                      key={job.id}
                      job={job}
                      sx={{
                        borderTop: index > 0 ? '1px solid' : '',
                        borderTopColor: 'border',
                      }}
                      onRemoveClick={() => dispatch(removeJob(job.id))}
                      onUploadClick={() => {
                        setIsUploadOpen(true);
                        setUploadJobId(job.id);
                      }}
                      onEditClick={() => history.push(`/${job.id}`)}
                      onApply={() => {
                        setIsSuggestOpen(true);
                        setProceedUrl(job.url);
                      }}
                    ></Job>
                  ))}
                </div>
              </LoadingOverlay>
            ) : (
              <NoJobs></NoJobs>
            )}
          </Fragment>
        )}
        <ResumeUpload
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUpload={(file) => {
            dispatch(uploadResume(uploadJobId, file));
            setIsUploadOpen(false);
          }}
        ></ResumeUpload>
        <UpdateSuggest
          isOpen={isSuggestOpen}
          onClose={() => setIsSuggestOpen(false)}
          onProceed={() => {
            window.open(proceedUrl);
            setIsSuggestOpen(false);
          }}
        ></UpdateSuggest>
      </Page>
    </DndProvider>
  );
};
