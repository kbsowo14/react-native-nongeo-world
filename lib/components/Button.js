"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Button = ({ title, onPress, style, textStyle, disabled = false }) => {
    return (<react_native_1.TouchableOpacity style={[styles.button, style, disabled && styles.disabled]} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <react_native_1.Text style={[styles.text, textStyle]}>{title}</react_native_1.Text>
    </react_native_1.TouchableOpacity>);
};
const styles = react_native_1.StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: '#CCCCCC',
    },
});
exports.default = Button;
