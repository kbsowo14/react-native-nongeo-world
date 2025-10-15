import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
export interface ArcadeButtonProps {
    wrapStyle?: StyleProp<ViewStyle>;
    boxStyle?: StyleProp<ViewStyle>;
    buttonText?: string | React.ReactNode;
    buttonTextStyle?: StyleProp<TextStyle>;
    backgroundColor?: string;
    paddingVertical?: number;
    paddingHorizontal?: number;
    buttonRadius?: number | string;
    wait?: number;
    thickness?: number;
    hasBorder?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    onPress?: () => void;
    isFullWidth?: boolean;
}
declare const _default: React.NamedExoticComponent<ArcadeButtonProps>;
export default _default;
//# sourceMappingURL=ArcadeButton.d.ts.map