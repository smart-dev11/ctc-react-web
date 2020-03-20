/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import Tab from '../components/Tab';
import Link from '../components/Link';
import Input from '../components/Input';
import { useState } from 'react';

export default () => {
  const { theme } = useThemeUI();
  const [editingIndex, setEditingIndex] = useState(0);
  const [positionText, setpositionText] = useState('');

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
        {editingIndex < 0 ? (
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto auto auto',
              gridGap: 4,
              width: 'fit-content',
              alignItems: 'center'
            }}
          >
            <Input
              value={positionText}
              onChange={e => setpositionText(e.target.value)}
              inputSx={{ py: 2 }}
              sx={{ width: 180 }}
            ></Input>
            <Link onClick={savePosition} color="primary" sx={{ fontSize: 3 }}>
              <i className="far fa-save"></i>
            </Link>
            <Link
              onClick={() => setEditingIndex(0)}
              color="primary"
              sx={{ fontSize: 3 }}
            >
              <i className="fas fa-times"></i>
            </Link>
          </div>
        ) : (
          <Tab active>
            <Link onClick={() => setEditingIndex(-1)}>
              <i className="fas fa-plus" sx={{ color: 'primary', mr: 1 }}></i>{' '}
              Add Position
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
