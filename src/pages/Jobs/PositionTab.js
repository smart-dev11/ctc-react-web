/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Tab from '../../components/Tab';

export default ({ position, active, ...props }) => {
  return (
    <Fragment>
      <Tab data-tip active={active} {...props}>
        {position.name}
      </Tab>
    </Fragment>
  );
};
