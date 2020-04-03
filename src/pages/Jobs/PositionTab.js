/** @jsx jsx */
import { jsx } from 'theme-ui';
import Tab from '../../components/Tab';
import ReactHoverObserver from 'react-hover-observer';
import Link from '../../components/Link';
import { useDrop } from 'react-dnd';

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
          ref={drop}
          sx={isOver ? { bg: 'primary', color: 'white' } : {}}
          {...props}
        >
          {position.name}
          <Link
            onClick={e => {
              e.stopPropagation();
              onEditClick();
            }}
            color={isHovering ? 'text' : isOver ? 'white' : 'border'}
            sx={{ ml: 2 }}
          >
            <i className="fas fa-pen"></i>
          </Link>
          <Link
            onClick={e => {
              e.stopPropagation();
              if (!window.confirm(`Are you sure to remove ${position.name}?`))
                return;
              onRemoveClick();
            }}
            color={isHovering ? 'text' : isOver ? 'white' : 'border'}
            sx={{ ml: 2 }}
          >
            <i className="fas fa-trash"></i>
          </Link>
        </Tab>
      )}
    </ReactHoverObserver>
  );
};
