import React from 'react';
import styled from 'styled-components';
import ItemView from './ItemView';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * @description Grid View is responsible render the Grid for Items Views and the Paginator.
 * @return {component}
 */

interface GridViewProps {
  collectionResult: object[];
  pages: number;
}

const StyledView = styled(View)`
  height: 90%;
`;
const GridView: React.FC<GridViewProps> = ({ collectionResult, pages }) => {
  return (
    <StyledView>
      <ScrollView>
        {collectionResult.map((item: any) => (
          <ItemView key={item.id} item={item} />
        ))}
      </ScrollView>
    </StyledView>
  );
};
export default GridView;
