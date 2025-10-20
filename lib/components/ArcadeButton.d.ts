import React from 'react';
export interface ArcadeButtonProps {
    backgroundColor?: string;
    paddingVertical?: number;
    paddingHorizontal?: number;
    buttonRadius?: number | string;
    thickness?: number;
    hasBorder?: boolean;
    disabled?: boolean;
    isLoading?: boolean | null;
    onPress?: () => void;
    isFullWidth?: boolean;
    children?: React.ReactNode;
}
declare const _default: React.NamedExoticComponent<ArcadeButtonProps>;
export default _default;
//# sourceMappingURL=ArcadeButton.d.ts.map