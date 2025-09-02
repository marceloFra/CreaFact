declare module 'react-native-autocomplete-input' {
  import { Component } from 'react';
  import { FlatListProps, ViewStyle } from 'react-native';
  export interface AutocompleteProps<T> {
    data: T[];
    value?: string;
    onChangeText?: (text: string) => void;
    renderItem?: ({ item, index }: { item: T; index: number }) => React.ReactNode;
    flatListProps?: Partial<FlatListProps<T>>;
    containerStyle?: ViewStyle;
    inputContainerStyle?: ViewStyle;
    listStyle?: ViewStyle;
  }
  export default class Autocomplete<T> extends Component<AutocompleteProps<T>> {}
}
