/** @jsx jsx */
import { jsx } from 'theme-ui';
import Tab from '../../components/Tab';
import ReactHoverObserver from 'react-hover-observer';
import Link from '../../components/Link';

export default ({ position, active, onEditClick, onRemoveClick, ...props }) => {
  return (
    <ReactHoverObserver sx={{ display: 'inline-block' }}>
      {({ isHovering }) => (
        <Tab active={active} {...props}>
          {position.name}
          <Link
            onClick={onEditClick}
            color={isHovering ? 'primary' : 'border'}
            sx={{ ml: 1 }}
          >
            <i className="fas fa-pen"></i>
          </Link>
          <Link
            onClick={onRemoveClick}
            color={isHovering ? 'primary' : 'border'}
            sx={{ ml: 1 }}
          >
            <i className="fas fa-trash"></i>
          </Link>
        </Tab>
      )}
    </ReactHoverObserver>
  );
};
