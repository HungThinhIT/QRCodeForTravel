import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from "react-native-bottomsheet-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: '#000',
        padding: 16,
        height: 600,
        flex: 1
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
    />
  );
}

const styles = StyleSheet.create({

})