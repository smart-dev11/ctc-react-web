/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from '../../components/Link';

export default ({ expanded, setExpanded }) =>
  expanded ? (
    <Link color="primary" onClick={() => setExpanded(false)}>
      Less
    </Link>
  ) : (
    <Link sx={{ fontSize: 4 }} onClick={() => setExpanded(true)}>
      <i className="fas fa-ellipsis-h"></i>
    </Link>
  );
