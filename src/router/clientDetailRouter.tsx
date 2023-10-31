import { AxiosError } from 'axios';
import moment from 'moment-timezone';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import {
  getProductVariantIds,
  mergeProductToOrder,
} from '../components/client-profile/client-details-wrapper/service';
import {
  APPOINTMENT_STATES,
  DEFAULT_TIMEZONE,
  FORMAT_DATE,
  LOCAL_STORAGE_KEYS,
} from '../constants/appConstants';
import { ToastContext } from '../providers/context/toastContext';
import { AppointmentService } from '../services/Appointment';
import { CustomerService } from '../services/Customer';
import { OrderService } from '../services/orders';
import { ProductService } from '../services/product';
import { TreatmentService } from '../services/Treatment';
import {
  updateClient,
  updateKnackRecords,
  updateAppointments,
  updatePastPurchasedProduct,
  updateProductsToAvoid,
  updateTreatment,
  refreshClientEndpoint,
} from '../store/client/ClientAction';
import ClientContext from '../store/client/ClientContext';
import FormStateProvider from '../store/form/formStateProvider';
import { ClientDetailsType, IParams } from '../types/clientProfile';
import { TRoute } from '../types/commonTypes';
import { AppointmentRelations } from '../types/services/Appointment';
import { PaginationData } from '../types/services/Common';
import { CustomerRelations } from '../types/services/Customer';
import { Order, OrderLineTypes, OrderRelations } from '../types/services/Order';
import { Product, ProductRelation } from '../types/services/product';
import {
  TreatmentRelation,
  TreatmentResponse,
} from '../types/services/Treatment';
import { TClientContext } from '../types/store/client';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../utils/helper-functions/handleError';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/helper-functions/user';
const ClientDetail = React.lazy(() => import('./pages/ClientDetail'));
const PastTreatmentsListView = React.lazy(
  () => import('./pages/PastTreatmentsListView')
);
const routes: TRoute[] = [
  {
    path: '/',
    exact: true,
    name: 'Clients',
    component: ClientDetail,
    provider: FormStateProvider,
  },
  {
    path: '/past-treatments',
    exact: true,
    name: 'Past Treatments',
    component: PastTreatmentsListView,
    provider: FormStateProvider,
  },
];

const ClientDetailRouter = () => {
  const { clientID }: IParams = useParams();
  const { clientState, clientDispatch } =
    useContext<TClientContext>(ClientContext);
  const { path } = useRouteMatch();
  const defaultRoute = routes.find((route) => route.default);
  const allergy = useMemo(() => {
    return clientState.mappedHealthIntake?.sensitivities?.topicalAlergies
      ?.answer;
  }, [clientState.mappedHealthIntake]);
  const { showErrorDialog } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getClientDetails();
    getClientTreatmentsDetails();
    getClientMissingTreatments();
    getPastPurchases();
  }, [clientID]);

  // Refreshing the updates from API
  useEffect(() => {
    if (clientState.refreshClientEndpoints) {
      getClientTreatmentsDetails();
      getClientMissingTreatments();
      getClientDetails();
      clientDispatch(refreshClientEndpoint(false)); // reset the refresh state
    }
  }, [clientState.refreshClientEndpoints]);

  useEffect(() => {
    if (allergy?.length) {
      getProductsToAvoid(allergy.join());
    }
  }, [allergy]);

  useEffect(() => {
    const s3Json = getLocalStorageItem(
      LOCAL_STORAGE_KEYS.S3_TREATMENT_JSON
    ) as string;
    if (!s3Json) {
      fetchTreatmentFormJson();
    }
  }, []);

  const fetchTreatmentFormJson = async () => {
    const treatmentBuilderJsonURL =
      process.env.REACT_APP_INTAKE_HEALTH_JSON_URL +
      'form-builder/treatment-builder.json?rand=' +
      new Date().toISOString();
    return fetch(treatmentBuilderJsonURL)
      .then((response) => response.json())
      .then((response) => {
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.S3_TREATMENT_JSON,
          JSON.stringify(response)
        );
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          showErrorDialog(error?.message);
        } else if (error instanceof Error) {
          showErrorDialog(error?.message);
        }
        console.error(error);
        throw error;
      });
  };

  const getClientDetails = async () => {
    try {
      const clientDetail: ClientDetailsType =
        await CustomerService.getClientDetailsById(
          clientID,
          {
            customer:
              'id,first_name,last_name,name,profile_image_url,appointments_count,tr_recent_notes_for_customer,last_visit,enhancement_rate,product_attrition_rate,key_attributes,phone,email,original_email',
            tag: 'id,name',
            note: 'id,text,source,source_id,created_at,updated_at,context,context_id,type',
          },
          [
            CustomerRelations.Note,
            CustomerRelations.Tag,
            CustomerRelations.HealthIntake,
          ]
        );
      clientDispatch(updateClient(clientDetail));
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };
  const getClientTreatmentsDetails = async () => {
    try {
      const response: PaginationData<TreatmentResponse> =
        await TreatmentService.getTreatments(
          { number: 1, size: 10 },
          {
            customer_id: clientID,
          },
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
      if (response.meta.total < 3) {
        getKnackRecords();
      }
      clientDispatch(updateTreatment(response.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };
  const getClientMissingTreatments = async () => {
    try {
      const currentDate = moment().add(1, 'days').format(FORMAT_DATE.DAY);
      const appointmentsData = await AppointmentService.getAppointments(
        { number: 1, size: 50 },
        {
          customer_id: clientID,
          treatment_id: 'null',
          start_at: {
            gte: '2022-11-30',
            lte: moment
              .tz(new Date(currentDate), DEFAULT_TIMEZONE)
              .endOf('date')
              .toISOString(),
          },
          state: {
            ne: APPOINTMENT_STATES.CANCELLED,
          },
        },
        {
          appointment:
            'id,customer_id,location_id,start_at,end_at,rating,cancelled,is_remote,state,duration,cancelled,cancellation_reason,cancellation_note,treatment_id',
          customer: 'id,first_name,last_name,name',
          ['appointment_service.staff']: 'id,first_name,last_name,name',
        },
        [
          AppointmentRelations.Customer,
          AppointmentRelations.Location,
          AppointmentRelations.AppointmentServiceStaff,
        ]
      );
      clientDispatch(updateAppointments(appointmentsData.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };

  let allOrders: Order[] = [];
  const getPastPurchases = async () => {
    try {
      let total = 0;
      let currentSize = 0;
      let pageNo = 1;
      allOrders = [];
      do {
        const gteDate = moment(new Date()).subtract(1, 'years');
        const orderResp: PaginationData<Order> = await OrderService.getOrders(
          { number: pageNo, size: 50 },
          {
            customer_id: clientID,
            source_created_at: {
              gte: `${gteDate.format('YYYY-MM-DD')}`,
            },
            order_line: {
              type: OrderLineTypes.PRODUCT,
            },
          },
          {
            [OrderRelations.OrderLine]:
              'product_variant_id,type,quantity,order_id',
          },
          [OrderRelations.OrderLine]
        );
        allOrders = [...allOrders, ...orderResp.data];
        currentSize =
          (orderResp?.meta?.page || 1) * (orderResp?.meta?.size || 50);
        pageNo += 1;
        total = orderResp?.meta.total;
      } while (total > currentSize);
      if (allOrders.length > 0) {
        const productVariantIds: string[] = getProductVariantIds(allOrders);
        getProductsByVariantIds(1, productVariantIds);
      } else {
        clientDispatch(updatePastPurchasedProduct([]));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };

  let allProducts: Product[] = [];
  const getProductsByVariantIds = async (
    pageNo: number,
    variantIds: string[]
  ) => {
    try {
      if (!variantIds.length) {
        return;
      }
      const productResp: PaginationData<Product> =
        await ProductService.getProducts(
          { number: pageNo, size: 50 },
          {
            variant_ids: variantIds.join(','),
          },
          {
            [ProductRelation.productImage]: 'src,position',
          },
          [ProductRelation.productImage, ProductRelation.productVariant]
        );

      allProducts = [...allProducts, ...productResp.data];

      const currentSize =
        (productResp?.meta?.page || 1) * (productResp?.meta?.size || 50);

      if (productResp?.meta.total > currentSize) {
        getProductsByVariantIds(pageNo + 1, variantIds);
      } else {
        clientDispatch(
          updatePastPurchasedProduct(
            mergeProductToOrder(allProducts, allOrders)
          )
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };

  const getProductsToAvoid = async (allergy: string) => {
    try {
      const products = await ProductService.getProducts(
        { number: 1, size: 10 },
        { allergy: { with: allergy }, display_in_shopapp: true }, // static allergies passed as allergies not available
        {
          [ProductRelation.productImage]: 'src,position',
        },
        [ProductRelation.productImage]
      );
      clientDispatch(updateProductsToAvoid(products));
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };
  const getKnackRecords = async () => {
    try {
      const response: PaginationData<TreatmentResponse> =
        await TreatmentService.getTreatments(
          { number: 1, size: 5 },
          { customer_id: clientID, knack_only: true },
          {
            [TreatmentRelation.treatedByStaff]: 'first_name,last_name,name',
            [TreatmentRelation.enteredByStaff]: 'first_name,last_name,name',
          },
          [
            TreatmentRelation.enteredByStaff,
            TreatmentRelation.treatedByStaff,
            TreatmentRelation.note,
            TreatmentRelation.location,
          ]
        );
      clientDispatch(updateKnackRecords(response.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };
  return (
    <>
      {!isLoading && (
        <div>
          <Switch>
            {routes.map((route: TRoute, idx: number) => {
              return (
                <Route
                  key={`path-${idx}`}
                  path={`${path}${route.path}`}
                  exact={route.exact}
                  // eslint-disable-next-line react/no-children-prop
                  children={() => {
                    return (
                      <>
                        {route?.provider ? (
                          <route.provider>
                            <route.component />
                          </route.provider>
                        ) : (
                          <route.component />
                        )}
                      </>
                    );
                  }}
                />
              );
            })}
            {defaultRoute ? (
              <Route key={`redirect`}>
                <Redirect to={{ pathname: `${path}${defaultRoute.path}` }} />
              </Route>
            ) : null}
          </Switch>
        </div>
      )}
    </>
  );
};

export default ClientDetailRouter;
