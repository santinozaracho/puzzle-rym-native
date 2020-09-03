import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import useQueryContext from '../../../store/QueryContext';
import styled from 'styled-components';

const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

interface SearchInputProps {}

const StyledInput = styled(Input)`
  margin: 10px;
`;

const SearchInput: React.SFC<SearchInputProps> = props => {
  const { query, clearQuery, setSearchString, setEntity, setExtraFilter } = useQueryContext();

  const handleExtraFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtraFilter(event.target.checked);
  };

  const handleString = searchStr => setSearchString(searchStr);

  const renderIconSearch = props => <Icon {...props} name={'search-outline'} />;

  return (
    <StyledInput
      value={query.searchString}
      placeholder="Search something here!"
      accessoryLeft={renderIconSearch}
      onChangeText={value => handleString(value)}
    />
  );
};

export default SearchInput;
