/** @jsx jsx */
import { jsx } from 'theme-ui';
import Moment from 'react-moment';
import Link from '../../components/Link';
import JobDetail from './JobDetail';

export default ({
  job,
  onRemoveClick,
  onUploadClick,
  onEditClick,
  ...props
}) => {
  return (
    <div
      sx={{
        p: 5,
        display: 'grid',
        gridTemplateColumns: '2fr 1fr auto',
        alignItems: 'center'
      }}
      {...props}
    >
      <JobDetail job={job}></JobDetail>
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
        <Link onClick={onUploadClick}>
          <i className="fas fa-upload"></i>
        </Link>
        <Link onClick={onEditClick}>
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
