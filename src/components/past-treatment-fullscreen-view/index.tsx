import { FC, useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import {
  PastTreatmentFSVHeader,
  PastTreatmentFSVContainer,
  RecordsWrapper,
} from './styles';
import FolderIcon from '../../assets/icons/folder.svg';
import PastTreatment from '../client-profile/past-treatment';
import {
  Treatment,
  TreatmentRelation,
  TreatmentResponse,
} from '../../types/services/Treatment';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../utils/helper-functions/handleError';
import { TreatmentService } from '../../services/Treatment';
import { AxiosError } from 'axios';
import { PaginationData, PaginationMeta } from '../../types/services/Common';
import { useParams } from 'react-router-dom';
import { IParams } from '../../types/clientProfile';
import { TClientContext } from '../../types/store/client';
import ClientContext from '../../store/client/ClientContext';
import { StyledCircularProgress } from '../../containers/layout.styles';
import KnackArchived from '../client-profile/knack-archived';
import StyledButton from '../common/Button';
import { getTreatmentTag } from '../client-profile/past-treatment/service';
import { refreshClientEndpoint } from '../../store/client/ClientAction';
import { ToastContext } from '../../providers/context/toastContext';

const PastTreatmentFullscreenView: FC = () => {
  const { clientID }: IParams = useParams();
  const { clientState, clientDispatch } =
    useContext<TClientContext>(ClientContext);
  const [treatments, setTreatments] = useState<TreatmentResponse[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [metaData, setMetaData] = useState<PaginationMeta>({
    total: 0,
    page: 0,
    size: 10,
  });
  const [knackMetaData, setKnackMetaData] = useState<PaginationMeta>({
    total: 0,
    page: 0,
    size: 10,
  });
  const [knackRecords, setKnackRecords] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(false);
  const { showErrorDialog } = useContext(ToastContext);
  useEffect(() => {
    setLoading(true);
    getClientTreatmentsDetails();
    getKnackRecords();
  }, [clientID]);
  useEffect(() => {
    setLoading(true);
    if (clientState.refreshClientEndpoints) {
      setTreatments([]);
      getClientTreatmentsDetails();
      clientDispatch(refreshClientEndpoint(false));
    }
  }, [clientState.refreshClientEndpoints]);

  const getClientTreatmentsDetails = async () => {
    try {
      const response: PaginationData<TreatmentResponse> =
        await TreatmentService.getTreatments(
          { number: metaData.page + 1, size: metaData.size },
          { customer_id: clientID },
          {
            [TreatmentRelation.treatedByStaff]: 'first_name,last_name,name',
            [TreatmentRelation.enteredByStaff]: 'first_name,last_name,name',
            [TreatmentRelation.location]: 'city,name,tz',
          },
          [
            TreatmentRelation.enteredByStaff,
            TreatmentRelation.treatedByStaff,
            TreatmentRelation.location,
            TreatmentRelation.recommendedProduct,
            TreatmentRelation.note,
          ]
        );
      setPageNumber(pageNumber + 1);
      setMetaData(response.meta);
      setTreatments([...treatments, ...response.data]);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const getKnackRecords = async () => {
    try {
      const response: PaginationData<TreatmentResponse> =
        await TreatmentService.getTreatments(
          { number: knackMetaData.page + 1, size: knackMetaData.size },
          { customer_id: clientID, knack_only: true },
          {
            [TreatmentRelation.treatedByStaff]: 'first_name,last_name,name',
            [TreatmentRelation.enteredByStaff]: 'first_name,last_name,name',
          },
          [
            TreatmentRelation.enteredByStaff,
            TreatmentRelation.treatedByStaff,
            TreatmentRelation.note,
          ]
        );
      setKnackRecords((prevState) => {
        return [...prevState, ...response.data];
      });
      setKnackMetaData(response.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        defaultErrorHandler(error.message);
        showErrorDialog(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const knackRecordsLoadMore = () => {
    getKnackRecords();
  };
  const pastTreatmentLoadMore = () => {
    getClientTreatmentsDetails();
  };
  return (
    <>
      <PastTreatmentFSVHeader>
        <img src={FolderIcon} alt='Past Treatments' className='headerIcon' />
        <Typography variant='h1' color={'var(--neutral-primary)'}>
          {clientState.firstName}’s Past Treatments
        </Typography>
      </PastTreatmentFSVHeader>
      {loading && (
        <div className='loader-div'>
          <StyledCircularProgress />
        </div>
      )}
      {!loading && treatments.length ? (
        <PastTreatmentFSVContainer>
          <RecordsWrapper>
            {treatments.map((treatment, index) => {
              const estheticianName = treatment?.treatedByStaff?.firstName
                ? `${treatment?.treatedByStaff?.firstName} ${treatment?.treatedByStaff?.lastName}`
                : treatment?.treatedByStaff?.name;
              return (
                <PastTreatment
                  key={`pTreatmentFCV-${index}`}
                  treatmentTag={getTreatmentTag(treatment)}
                  estheticianName={estheticianName}
                  date={treatment.appointmentTime}
                  location={treatment.location.name}
                  treatmentDetails={treatment}
                  id={treatment?.id}
                />
              );
            })}
          </RecordsWrapper>
          {metaData.total !== 0 && metaData.total !== treatments.length && (
            <StyledButton
              variant='outlined'
              value={'Load More'}
              onClick={pastTreatmentLoadMore}
            />
          )}
        </PastTreatmentFSVContainer>
      ) : null}
      {knackRecords.length ? (
        <PastTreatmentFSVContainer>
          <Typography variant='h3' marginBottom={'24px'}>
            Knack Treatment Records
          </Typography>
          <RecordsWrapper>
            {knackRecords.map((record, index) => {
              return (
                <KnackArchived
                  key={`knack-${index}`}
                  date={record.appointmentTime}
                  data={record}
                />
              );
            })}
          </RecordsWrapper>
          {knackMetaData.total !== knackRecords.length && (
            <StyledButton
              variant='outlined'
              value={'Load More'}
              onClick={knackRecordsLoadMore}
            />
          )}
        </PastTreatmentFSVContainer>
      ) : null}
    </>
  );
};

export default PastTreatmentFullscreenView;
