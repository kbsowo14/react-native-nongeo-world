import React from 'react';
import { TextInputProps, TextStyle } from 'react-native';
export interface InputProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    style?: TextStyle;
    label?: string;
    error?: string;
}
declare const Input: React.FC<InputProps>;
export default Input;
//# sourceMappingURL=Input.d.ts.map