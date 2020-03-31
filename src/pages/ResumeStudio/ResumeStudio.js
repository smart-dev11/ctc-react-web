/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';

export default () => {
  const params = useParams();
  console.log(params);
  return (
    <Page>
      <PageTitle>Resume Studio</PageTitle>
    </Page>
  );
};
