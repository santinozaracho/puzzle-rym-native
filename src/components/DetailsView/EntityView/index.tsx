import React from 'react';
import { gql, useQuery } from '@apollo/client';
import useQueryContext from '../../../store/QueryContext';
import ErrorView from '../../ErrorView';
import LoadingView from '../../LoadingView';
import CharacterView from './CharacterView';
import LocationView from './LocationView';
import EpisodeView from './EpisodeView';
import { GET_CHARACTER, GET_EPISODE, GET_LOCATION } from '../../../queries/entityQueries';

/**
 * @description This component is responsible for make querys to RandM API and render the correct View.
 * @return {component}
 */
interface EntityViewProps {}

const connectQuery: any = {
  characters: () => GET_CHARACTER,

  locations: () => GET_LOCATION,

  episodes: () => GET_EPISODE,
};

const componentSelector = (loading: any, error: any, data: any) => {
  if (data) {
    const { character, location, episode } = data;

    if (character) return <CharacterView character={character} />;

    if (location) return <LocationView location={location} />;

    if (episode) return <EpisodeView episode={episode} />;
  }
  if (loading) return <LoadingView />;

  return <ErrorView />;
};

const EntityView: React.FC<EntityViewProps> = props => {
  const {
    query: { entity, itemDetails },
  } = useQueryContext();

  const { loading, error, data } = useQuery(connectQuery[entity](), {
    variables: {
      id: itemDetails.itemID,
    },
  });

  const componentToRender = componentSelector(loading, error, data);
  return componentToRender;
};

export default EntityView;
