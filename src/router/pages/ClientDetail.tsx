import { FC, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb';
import ClientDetailsProvider from '../../providers/context/ClientDetailsContext';
import {
  APPOINTMENT_METRICS,
  PROFILE_TAGS,
} from '../../constants/appConstants';
import ClientProfileHeader from '../../components/client-profile/client-profile-header';
import ClientDetailsWrapper from '../../components/client-profile/client-details-wrapper';
import ClientNotes from '../../components/client-profile/client-notes';
import { IParams, ProfileTag } from '../../types/clientProfile';
import { TClientContext } from '../../types/store/client';
import ClientContext from '../../store/client/ClientContext';

const ClientDetail: FC = () => {
  const { clientID }: IParams = useParams();
  const { clientState } = useContext<TClientContext>(ClientContext);
  const aptMetrics = useMemo(() => {
    return APPOINTMENT_METRICS.map((metric) => {
      if (clientState[metric.key]) {
        return { ...metric, value: clientState[metric.key] };
      }
      return metric;
    });
  }, [
    clientState.appointmentsCount,
    clientState.enhancementRate,
    clientState.productAttritionRate,
    clientState.lastVisit,
  ]);

  const breadcrumbData = [
    { link: '/clients', pathName: 'Clients' },
    { link: `/clients/${clientID}`, pathName: clientState?.firstName || '' },
  ];
  const getProfileTags = (
    tags: ProfileTag[] | undefined
  ): ProfileTag[] | [] => {
    let tagArray: ProfileTag[] = [];
    if (tags && tags?.length) {
      tagArray = PROFILE_TAGS.filter((tag) => {
        return tags.find((clientTag) => {
          if (clientTag.name === tag.label) {
            return tag;
          }
        });
      });
    }
    return tagArray;
  };
  return (
    <>
      {/* <FormStateProvider> */}
      <Breadcrumb breadcrumbs={breadcrumbData} />
      {/* <ClientDetailsProvider> will be removed after all API integration for client profile */}
      <ClientDetailsProvider>
        <ClientProfileHeader
          firstName={clientState?.firstName}
          lastName={clientState?.lastName}
          name={clientState?.name}
          tags={getProfileTags(clientState?.tag)}
          appointmentMetrics={aptMetrics}
          profileImgUrl={clientState?.profileImageUrl}
          email={clientState?.email}
          phone={clientState?.phone}
          originalEmail={clientState?.originalEmail}
        />
        <ClientNotes />
        <ClientDetailsWrapper />
      </ClientDetailsProvider>
      {/* </FormStateProvider> */}
    </>
  );
};

export default ClientDetail;
