"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Input = (_a) => {
    var { placeholder, value, onChangeText, style, label, error } = _a, props = __rest(_a, ["placeholder", "value", "onChangeText", "style", "label", "error"]);
    return (<react_native_1.View style={styles.container}>
      {label && <react_native_1.Text style={styles.label}>{label}</react_native_1.Text>}
      <react_native_1.TextInput style={[styles.input, style, error ? styles.inputError : undefined]} placeholder={placeholder} value={value} onChangeText={onChangeText} placeholderTextColor="#999999" {...props}/>
      {error ? <react_native_1.Text style={styles.errorText}>{error}</react_native_1.Text> : null}
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
});
exports.default = Input;
