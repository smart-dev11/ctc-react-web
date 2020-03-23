/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import Tab from '../../components/Tab';
import Link from '../../components/Link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { positionsSelector, getPositions } from '../../store/positions';
import EditPosition from './EditPosition';
import PositionTab from './PositionTab';

export default () => {
  const { theme } = useThemeUI();
  const dispatch = useDispatch();
  const positions = useSelector(positionsSelector);
  const [editingIndex, setEditingIndex] = useState(0);
  const [positionName, setPositionName] = useState('');

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  const savePosition = () => {};

  return (
    <Page>
      <div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <PageTitle>My Resumes</PageTitle>
        <Button>
          Upload resume <i className="fas fa-plus"></i>
        </Button>
      </div>
      <div sx={{ mt: 4 }}>
        {positions.map(position => (
          <PositionTab key={position.id} position={position.name}></PositionTab>
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
      <div
        sx={{ p: 12, boxShadow: 'medium', flex: 1, backgroundColor: 'white' }}
      >
        <div
          sx={{
            border: `1px dashed ${theme.colors.text}`,
            py: [6, 13],
            px: [6, 19],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '100%'
          }}
        >
          <div sx={{ fontSize: 2, color: 'text' }}>
            There's nothing here... Yet!
          </div>
          <div sx={{ fontSize: 2, color: 'text', mt: 9 }}>
            Click upload button to upload your resume
          </div>
        </div>
      </div>
    </Page>
  );
};
