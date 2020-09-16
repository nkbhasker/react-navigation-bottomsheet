import React, { useRef, useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import ReAnimated from 'react-native-reanimated';
import { useContext } from 'react';
import { Text, View } from 'react-native';

export enum RenderComponet {
  HOME = 'HOME',
  SETTINGS = 'SETTINGS',
  DEFAULT = 'DEFAULT'
}

export interface IBottomSheetConfig {
  renderComponent: RenderComponet;
  borderRadius?: number;
  snapPoints: Array<number | string>;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type BottomSheetConfigType = AtLeast<IBottomSheetConfig, 'renderComponent'>;

const BOTTOM_SHEET_CONFIG: IBottomSheetConfig = {
  renderComponent: RenderComponet.DEFAULT,
  borderRadius: 20,
  snapPoints: ['50%', 0]
}

export const BottomSheetContext = React.createContext<(config: BottomSheetConfigType) => void>(() => { });

export const useBottomSheet = () => useContext(BottomSheetContext);

export function HomeContent() {
  return (
    <View
      style={{
        backgroundColor: 'papayawhip',
        padding: 16,
        minHeight: 500
      }}
    >
      <Text>Home Content (Swipe down to close)</Text>
    </View>
  );
}

export function SettingsContent() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        minHeight: 500
      }}
    >
      <Text>Settings Content (Swipe down to close)</Text>
    </View>
  );
}


const BottomSheetProvider: React.FC = ({ children }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const fall = new ReAnimated.Value(1);

  const [bottomSheetConfig, setBottomSheetConfig] = useState<IBottomSheetConfig>(BOTTOM_SHEET_CONFIG);

  const openBottomSheet = (config: BottomSheetConfigType) => {
    setBottomSheetConfig({
      ...bottomSheetConfig,
      ...config
    });
    sheetRef.current?.snapTo(0);
  }

  const renderContent = () => {
    switch (bottomSheetConfig.renderComponent) {
      case RenderComponet.HOME:
        return <HomeContent />
      case RenderComponet.SETTINGS:
        return <SettingsContent />
      case RenderComponet.DEFAULT:
        return <View />
    }
  }
  return (
    <BottomSheetContext.Provider value={openBottomSheet}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['50%', 0]}
        callbackNode={fall}
        borderRadius={25}
        renderContent={renderContent}
        initialSnap={1}
      />
      {children}
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetProvider;