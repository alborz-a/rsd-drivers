const React = require('react');
const { View } = require('react-native-web');

const BottomSheet = (props) => React.createElement(View, props);
const BottomSheetModal = (props) => React.createElement(View, props);
const BottomSheetModalProvider = (props) => React.createElement(React.Fragment, null, props.children);
const BottomSheetView = (props) => React.createElement(View, props);
const BottomSheetTextInput = (props) => React.createElement(View, props);
const useBottomSheet = () => ({});
const useBottomSheetModal = () => ({
    present: () => {},
    dismiss: () => {},
});

module.exports = {
  default: BottomSheet,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheet,
  useBottomSheetModal,
};
