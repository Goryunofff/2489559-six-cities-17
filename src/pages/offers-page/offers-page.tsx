import Header from '../../components/header/header';
import Map from '../../components/map/map';
import ReviewsForm from '../../components/reviews/reviews-form';
import ReviewsList from '../../components/reviews/reviews-list';
import OffersList from '../../components/offer/offers-list';
import { useEffect } from 'react';
import { MAX_PLACES_NEARBY, OfferPageType } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { useParams } from 'react-router-dom';
import { fetchOfferAction, fetchOfferCommentsAction, fetchOffersNearbyAction } from '../../store/api-action';
import OfferImages from '../../components/offer/offer-images';
import OfferInfo from '../../components/offer/offer-info';
import OfferHostInfo from '../../components/offer/offer-host-info';
import { AuthorizationStatus } from '../../constants/constants';

function OfferPage(): JSX.Element {
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const currentOfferNearby = useAppSelector((state) => state.currentOffersNearby);
  const currentOfferComments = useAppSelector((state) => state.currentOfferComments);
  const offersNearby = currentOfferNearby && currentOfferNearby.slice(0, MAX_PLACES_NEARBY.MAX_PLACES);
  const isAuth = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id && currentOffer.id !== id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchOfferCommentsAction(id));
      dispatch(fetchOffersNearbyAction(id));
    }
  }, [id, currentOffer.id, dispatch]);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">

          <OfferImages images={currentOffer.images} />

          <div className="offer__container container">
            <div className="offer__wrapper">

              <OfferInfo offer={currentOffer} goods={currentOffer.goods} />

              <OfferHostInfo offer={currentOffer} />

              <section className="offer__reviews reviews">

                <ReviewsList reviews={currentOfferComments} />

                {isAuth && <ReviewsForm id={currentOffer.id} />}
              </section>
            </div>
          </div>
        </section>
        <Map city={currentOffer.city} offers={offersNearby} mapType={OfferPageType.NEAR_PLACES} offerOpened={currentOffer} />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersNearby} pageType={OfferPageType.NEAR_PLACES} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
