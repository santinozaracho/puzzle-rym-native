import React, { useRef } from 'react';
import styled from 'styled-components';
import ItemView from './ItemView';
import { View } from 'react-native';
import { List, ListItem, Icon, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useQueryContext from '../../../store/QueryContext';

/**
 * @description Grid View is responsible render the Grid for Items Views and the Paginator.
 * @return {component}
 */

interface GridViewProps {
  collectionResult: object[];
  pages: number;
}

const StyledView = styled(View)`
  height: 100%;
  width: 100%;
`;
const StyledText = styled(Text)`
  margin: auto;
`;

const GridView: React.FC<GridViewProps> = ({ collectionResult, pages }) => {
  const { query, nextPage } = useQueryContext();
  const { page } = query;
  const listRef = useRef(null);
  const renderItem = ({ item }) => <ItemView item={item} />;
  const backPageButton = props =>
    page > 1 ? (
      <TouchableOpacity onPress={() => nextPage(page - 1)}>
        <Icon {...props} name="arrow-ios-back" />
      </TouchableOpacity>
    ) : (
      <Icon {...props} name="radio-button-off-outline" />
    );
  const nextPageButton = props =>
    page < pages ? (
      <TouchableOpacity onPress={() => nextPage(page + 1)}>
        <Icon {...props} name="arrow-ios-forward" />
      </TouchableOpacity>
    ) : (
      <Icon {...props} name="radio-button-off-outline" />
    );

  const textCenter = () => <StyledText>{'Page ' + page + ' of ' + pages}</StyledText>;

  useRef(listRef.current?.scrollToIndex({ animated: true, index: 0 }));

  const handleNewdata = () => {};

  return (
    <StyledView>
      <List
        ref={listRef}
        data={collectionResult}
        renderItem={renderItem}
        onEndReached={handleNewdata}
      />
      {pages > 1 && (
        <ListItem
          disabled
          title={textCenter}
          accessoryLeft={backPageButton}
          accessoryRight={nextPageButton}
        />
      )}
    </StyledView>
  );
};
export default GridView;
