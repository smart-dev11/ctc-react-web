/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Tab from '../../components/Tab';
import HoverObserver from 'react-hover-observer';
import Link from '../../components/Link';

export default ({ position }) => {
  return (
    <HoverObserver sx={{ display: 'inline-block' }}>
      {({ isHovering }) => (
        <Tab>
          {position}{' '}
          {isHovering && (
            <Fragment>
              <Link color="primary">
                <i className="fas fa-pen"></i>
              </Link>
              <Link color="primary" sx={{ ml: 2 }}>
                <i className="fas fa-trash"></i>
              </Link>
            </Fragment>
          )}
        </Tab>
      )}
    </HoverObserver>
  );
};
