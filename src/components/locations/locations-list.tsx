import LocationsItem from './location-item';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MouseEvent } from 'react';
import { changeCity, changeSortingType } from '../../store/action';
import { SortType } from '../../constants/constants';
type LocationsListProps = {
  locations: string[];
}

function LocationsList(props: LocationsListProps): JSX.Element {
  const { locations } = props;
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const handleCityChange = (evt: MouseEvent<HTMLAnchorElement>) => {
    dispatch(changeCity({city: evt.currentTarget.text}));
    dispatch(changeSortingType(SortType.POPULAR));
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((element) =>
            (<LocationsItem key={element} title={element} selectedCity={currentCity} onCityChange={handleCityChange}/>))}
        </ul>
      </section>
    </div>
  );
}
export default LocationsList;
