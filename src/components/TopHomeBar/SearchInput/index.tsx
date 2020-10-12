import React from 'react';
import { Icon, Input } from '@ui-kitten/components';
import useQueryContext from '../../../store/QueryContext';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  margin: 10px;
`;

const SearchInput: React.FC = () => {
  const {
    query: { searchString },
    setSearchString,
  } = useQueryContext();

  const handleString = searchStr => setSearchString(searchStr);

  const renderIconSearch = props => <Icon {...props} name={'search-outline'} />;

  return (
    <StyledInput
      testID="searchInput"
      value={searchString}
      placeholder="Search something here!"
      accessoryLeft={renderIconSearch}
      onChangeText={handleString}
    />
  );
};

export default SearchInput;
