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
          {isHovering && (
            <Link
              onClick={onEditClick}
              color={isHovering ? 'text' : 'border'}
              sx={{ ml: 2 }}
            >
              <i className="fas fa-pen"></i>
            </Link>
          )}
          <Link
            onClick={() =>
              window.confirm(`Are you sure to remove ${position.name}?`) &&
              onRemoveClick()
            }
            color={isHovering ? 'text' : 'border'}
            sx={{ ml: 2 }}
          >
            <i className="fas fa-trash"></i>
          </Link>
        </Tab>
      )}
    </ReactHoverObserver>
  );
};
