/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import Tab from '../components/Tab';

export default () => {
  const { theme } = useThemeUI();
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
        <Tab active>
          <i className="fas fa-plus" sx={{ color: 'primary', mr: 1 }}></i> Add
          Position
        </Tab>
      </div>
      <div
        sx={{ p: 12, boxShadow: 'medium', flex: 1, backgroundColor: 'white' }}
      >
        <div
          sx={{
            border: `1px dashed ${theme.colors.text}`,
            py: [6, 13],
            px: [6, 19],
            textAlign: 'center'
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
