import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb';
import PastTreatmentFullscreenView from '../../components/past-treatment-fullscreen-view';
import ClientContext from '../../store/client/ClientContext';
import { TClientContext } from '../../types/store/client';

interface IParams {
  clientID: string;
}

const PastTreatmentsListView: FC = () => {
  const { clientID }: IParams = useParams();
  const { clientState } = useContext<TClientContext>(ClientContext);
  const breadcrumbData = [
    { link: '/clients', pathName: 'Clients' },
    { link: `/clients/${clientID}`, pathName: clientState?.firstName || '' },
    {
      link: `/clients/${clientID}/past-treatments`,
      pathName: 'Past Treatments',
    },
  ];

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbData} />
      <PastTreatmentFullscreenView />
    </>
  );
};

export default PastTreatmentsListView;
