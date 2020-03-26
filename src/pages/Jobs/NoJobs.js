/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import Button from '../../components/Button';
import Step from './Step';

export default () => {
  const { theme } = useThemeUI();

  return (
    <div sx={{ p: 12, boxShadow: 'medium', flex: 1, backgroundColor: 'white' }}>
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
          Follow these 6 setps to quickly find your next job and improve your
          ATS ranking:
        </div>
        <Step
          step={1}
          detail="Add positions you're looking for."
          sx={{ mt: 12 }}
        ></Step>
        <Step
          step={2}
          detail="Install the Couch to Career browser extension."
        ></Step>
        <Step
          step={3}
          detail="Save jobs from your favorite job sites to your Couch to Career account."
        ></Step>
        <Step
          step={4}
          detail="Upload and automatically edit your résumé to match keywords for better ATS rankings."
        ></Step>
        <Step
          step={5}
          detail="Share your résumé directly with recruiters, LinkedIn connections, and friends."
        ></Step>
        <Step
          step={6}
          detail="Enroll in the FREE job search training course for more interviews, tools and advice."
        ></Step>
        <Button sx={{ mt: 12 }}>
          Install Browser Extension <i className="fas fa-plus"></i>
        </Button>
      </div>
    </div>
  );
};
