"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
/**
 * 게임화면에 사용되는 3D 스타일 버튼
 * @param buttonText - 버튼 텍스트 또는 커스텀 컴포넌트
 * @param buttonTextStyle - 버튼 텍스트 스타일
 * @param backgroundColor - 버튼 배경색 (기본: '#f97316')
 * @param paddingVertical - 수직 패딩 (기본: 12)
 * @param paddingHorizontal - 수평 패딩 (기본: 24)
 * @param buttonRadius - 버튼 모서리 둥글기 (기본: 12)
 * @param thickness - 버튼 두께 (3D 효과, 기본: 8)
 * @param hasBorder - 그림자 테두리 표시 여부 (기본: true)
 * @param disabled - 비활성화 여부
 * @param isLoading - 로딩 상태 표시 (null: 로딩 상태 없음, true: 로딩 상태, false: 로딩 상태 아님)
 * @param onPress - 클릭 이벤트 핸들러
 * @param isFullWidth - 전체 너비 사용 여부
 * @param children - 버튼 내부 컴포넌트
 */
const ArcadeButton = (_a) => {
    var { buttonText = '', buttonTextStyle, backgroundColor = '#f97316', paddingVertical = 12, paddingHorizontal = 24, buttonRadius = 12, thickness = 8, hasBorder = true, disabled = false, isLoading = null, onPress, isFullWidth = false, children } = _a, args = __rest(_a, ["buttonText", "buttonTextStyle", "backgroundColor", "paddingVertical", "paddingHorizontal", "buttonRadius", "thickness", "hasBorder", "disabled", "isLoading", "onPress", "isFullWidth", "children"]);
    const [currentRadius, setCurrentRadius] = (0, react_1.useState)(null);
    const pressPosition = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const pressInAnimated = (0, react_1.useCallback)(() => {
        react_native_1.Animated.timing(pressPosition, {
            toValue: 10,
            duration: 25,
            useNativeDriver: true,
        }).start();
    }, [pressPosition]);
    const pressOutAnimated = (0, react_1.useCallback)(() => {
        react_native_1.Animated.timing(pressPosition, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start();
    }, [pressPosition]);
    const handlePress = (0, react_1.useCallback)(() => {
        if (disabled || isLoading)
            return;
        if (typeof onPress === 'function') {
            onPress();
        }
    }, [disabled, isLoading, onPress]);
    return (<react_native_1.View style={[
            isFullWidth && { width: '100%' },
            currentRadius === null && { opacity: 0 },
        ]} {...args}>
      <react_native_1.View style={hasBorder && { paddingHorizontal: 4 }} onLayout={e => {
            var _a, _b;
            if (typeof buttonRadius === 'string') {
                const oneRadius = Math.round(((_b = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.layout) === null || _b === void 0 ? void 0 : _b.height) / 2);
                const multipleNumberValue = Math.round(100 / Number(buttonRadius === null || buttonRadius === void 0 ? void 0 : buttonRadius.replace('%', '')));
                setCurrentRadius(Math.round(oneRadius / multipleNumberValue));
            }
            else {
                setCurrentRadius(buttonRadius);
            }
        }}>
        <react_native_1.Pressable onPressIn={pressInAnimated} onPressOut={pressOutAnimated} onPress={handlePress} disabled={disabled} style={{
            marginBottom: hasBorder ? 4 : 0,
            paddingTop: thickness || 0,
        }}>
          {/* Around Border Effect */}
          {hasBorder && (<>
              <react_native_1.View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                width: '50%',
                height: '100%',
                position: 'absolute',
                bottom: -4,
                left: -4,
                borderTopLeftRadius: currentRadius || 0,
                borderBottomLeftRadius: currentRadius || 0,
            }}/>
              <react_native_1.View style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                bottom: -4,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <react_native_1.View style={{
                width: 8,
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}/>
              </react_native_1.View>
              <react_native_1.View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                width: '50%',
                height: '100%',
                position: 'absolute',
                bottom: -4,
                right: -4,
                borderTopRightRadius: currentRadius || 0,
                borderBottomRightRadius: currentRadius || 0,
            }}/>
            </>)}

          {/* Press Button Thickness Area */}
          <react_native_1.View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: backgroundColor,
            borderRadius: currentRadius || 0,
        }}>
            {thickness > 0 && (<react_native_1.View style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: currentRadius || 0,
            }}/>)}
          </react_native_1.View>

          {/* Press Button Block Area */}
          <react_native_1.Animated.View style={[
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                backgroundColor: backgroundColor,
                borderRadius: currentRadius || 0,
                transform: [
                    {
                        translateY: pressPosition.interpolate({
                            inputRange: [0, 10],
                            outputRange: [thickness * -1, 0],
                        }),
                    },
                ],
            },
            isFullWidth && { width: '100%' },
        ]}>
            {/* Top Light Effect-Line */}
            <react_native_1.View style={{
            width: '100%',
            height: 2,
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}>
              <react_native_1.View style={{
            width: 24,
            height: 2,
            position: 'absolute',
            top: 0,
            left: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}/>
              <react_native_1.View style={{
            width: 24,
            height: 2,
            position: 'absolute',
            top: 0,
            right: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}/>
            </react_native_1.View>

            {/* Text Area */}
            {isLoading === true && (<react_native_1.View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <react_native_1.ActivityIndicator size="small" color="#E5E7EB"/>
              </react_native_1.View>)}
            <react_native_1.View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isLoading ? 0 : 1,
        }}>
              {children}
            </react_native_1.View>
          </react_native_1.Animated.View>
        </react_native_1.Pressable>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = (0, react_1.memo)(ArcadeButton);
