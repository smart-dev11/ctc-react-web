/** @jsx jsx */
import { jsx } from 'theme-ui';
import Moment from 'react-moment';
import Link from '../../components/Link';

export default ({ job, onRemoveClick, ...props }) => {
  return (
    <div
      key={job.id}
      sx={{
        p: 5,
        display: 'grid',
        gridTemplateColumns: '2fr 1fr auto',
        alignItems: 'center'
      }}
      {...props}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridGap: 4,
          alignItems: 'center'
        }}
      >
        {job.logo ? (
          <img
            src={job.logo}
            alt={job.title}
            sx={{ width: 96, height: 96 }}
          ></img>
        ) : (
          <div sx={{ width: 96, height: 96, bg: 'black' }}></div>
        )}

        <div>
          <div sx={{ fontSize: 4, color: 'darkText' }}>{job.title}</div>
          <div sx={{ fontSize: 3, color: 'darkText' }}>{job.company}</div>
          <div sx={{ fontSize: 3, mt: 1, color: 'text' }}>{job.location}</div>
        </div>
      </div>
      <div>
        <Moment format="MMM D, YYYY">{job.created_at}</Moment>
      </div>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gridGap: 4,
          justifyContent: 'center'
        }}
      >
        <Link>
          <i className="fas fa-upload"></i>
        </Link>
        <Link>
          <i className="fas fa-pen"></i>
        </Link>
        <Link>
          <i className="fas fa-download"></i>
        </Link>
        <Link
          onClick={() =>
            window.confirm(`Are you user to remove ${job.title}`) &&
            onRemoveClick()
          }
        >
          <i className="fas fa-trash"></i>
        </Link>
      </div>
    </div>
  );
};
