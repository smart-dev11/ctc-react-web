/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Tab from '../../components/Tab';
import ReactHoverObserver from 'react-hover-observer';
import Link from '../../components/Link';
import { useDrop } from 'react-dnd';
import { ellipsis } from 'polished';
import _ from 'lodash';

export default ({
  position,
  active,
  onEditClick,
  onRemoveClick,
  onJobDrop,
  ...props
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'JOB',
    drop(item) {
      onJobDrop(item.job);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });
  return (
    <ReactHoverObserver sx={{ display: 'inline-block' }}>
      {({ isHovering }) => (
        <Tab
          active={active}
          sx={_.merge(
            { width: 200, display: 'flex' },
            isOver && { bg: 'primary', color: 'white' }
          )}
          ref={drop}
          {...props}
        >
          <div sx={{ flex: 1, fontSize: 2, ...ellipsis() }}>
            {position.name}
          </div>
          {isHovering && (
            <Fragment>
              <Link
                onClick={e => {
                  e.stopPropagation();
                  onEditClick();
                }}
                color={isOver ? 'white' : 'text'}
                sx={{ ml: 2 }}
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                onClick={e => {
                  e.stopPropagation();
                  if (
                    !window.confirm(`Are you sure to remove ${position.name}?`)
                  )
                    return;
                  onRemoveClick();
                }}
                color={isOver ? 'white' : 'text'}
                sx={{ ml: 2 }}
              >
                <i className="fas fa-trash"></i>
              </Link>
            </Fragment>
          )}
        </Tab>
      )}
    </ReactHoverObserver>
  );
};
