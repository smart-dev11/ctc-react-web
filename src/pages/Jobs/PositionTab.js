/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import Tab from '../../components/Tab';

export default ({ position, active, ...props }) => {
  const { theme } = useThemeUI();
  return (
    <Fragment>
      <Tab
        data-tip
        data-for={`position-${position.id}`}
        active={active}
        {...props}
      >
        {position.name}
      </Tab>
      {active && (
        <ReactTooltip
          id={`position-${position.id}`}
          effect="solid"
          place="top"
          backgroundColor={theme.colors.primary}
        >
          Click again to edit position
        </ReactTooltip>
      )}
    </Fragment>
  );
};
