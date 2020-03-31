/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ job }) => (
  <div
    sx={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridGap: 4,
      alignItems: 'center'
    }}
  >
    {job.logo ? (
      <img src={job.logo} alt={job.title} sx={{ width: 96, height: 96 }}></img>
    ) : (
      <div sx={{ width: 96, height: 96, bg: 'black' }}></div>
    )}

    <div>
      <div sx={{ fontSize: 4, color: 'darkText' }}>{job.title}</div>
      <div sx={{ fontSize: 3, color: 'darkText' }}>{job.company}</div>
      <div sx={{ fontSize: 3, mt: 1, color: 'text' }}>{job.location}</div>
    </div>
  </div>
);
