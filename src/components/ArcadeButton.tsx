import React, { memo, useCallback, useRef, useState } from 'react'
import { 
  ActivityIndicator, 
  Animated, 
  View, 
  Text, 
  Pressable,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native'

export interface ArcadeButtonProps {
  wrapStyle?: StyleProp<ViewStyle>
  boxStyle?: StyleProp<ViewStyle>
  buttonText?: string | React.ReactNode
  buttonTextStyle?: StyleProp<TextStyle>
  backgroundColor?: string
  paddingVertical?: number
  paddingHorizontal?: number
  buttonRadius?: number | string
  wait?: number
  thickness?: number
  hasBorder?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  isLoading?: boolean
  onPress?: () => void
  isFullWidth?: boolean
}

/**
 * 게임화면에 사용되는 3D 스타일 버튼
 * @param wrapStyle - 외부 감싸는 View 스타일
 * @param boxStyle - 버튼 내부 스타일
 * @param buttonText - 버튼 텍스트 또는 커스텀 컴포넌트
 * @param buttonTextStyle - 버튼 텍스트 스타일
 * @param backgroundColor - 버튼 배경색 (기본: '#f97316')
 * @param paddingVertical - 수직 패딩 (기본: 12)
 * @param paddingHorizontal - 수평 패딩 (기본: 24)
 * @param buttonRadius - 버튼 모서리 둥글기 (기본: 12)
 * @param wait - 연속 클릭 방지 대기시간 (ms)
 * @param thickness - 버튼 두께 (3D 효과, 기본: 8)
 * @param hasBorder - 그림자 테두리 표시 여부 (기본: true)
 * @param leftIcon - 왼쪽 아이콘
 * @param rightIcon - 오른쪽 아이콘
 * @param disabled - 비활성화 여부
 * @param isLoading - 로딩 상태 표시
 * @param onPress - 클릭 이벤트 핸들러
 * @param isFullWidth - 전체 너비 사용 여부
 */
const ArcadeButton: React.FC<ArcadeButtonProps> = ({
  wrapStyle,
  boxStyle,
  buttonText = '',
  buttonTextStyle,
  backgroundColor = '#f97316',
  paddingVertical = 12,
  paddingHorizontal = 24,
  buttonRadius = 12,
  wait = 250,
  thickness = 8,
  hasBorder = true,
  leftIcon,
  rightIcon,
  disabled = false,
  isLoading = false,
  onPress,
  isFullWidth = false,
}) => {
  const [currentRadius, setCurrentRadius] = useState<number | null>(null)
  const [isWaiting, setIsWaiting] = useState(false)

  const pressPosition = useRef(new Animated.Value(0)).current

  const pressInAnimated = useCallback(() => {
    Animated.timing(pressPosition, {
      toValue: 10,
      duration: 25,
      useNativeDriver: true,
    }).start()
  }, [pressPosition])

  const pressOutAnimated = useCallback(() => {
    Animated.timing(pressPosition, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start()
  }, [pressPosition])

  const handlePress = useCallback(() => {
    if (isWaiting || disabled || isLoading) return
    
    if (onPress) {
      onPress()
    }

    if (wait > 0) {
      setIsWaiting(true)
      setTimeout(() => setIsWaiting(false), wait)
    }
  }, [isWaiting, disabled, isLoading, onPress, wait])

  return (
    <View
      style={[
        isFullWidth && { width: '100%' },
        currentRadius === null && { opacity: 0 },
        wrapStyle,
      ]}
    >
      <View
        style={hasBorder && { paddingHorizontal: 4 }}
        onLayout={e => {
          if (typeof buttonRadius === 'string') {
            const oneRadius = Math.round(e?.nativeEvent?.layout?.height / 2)
            const multipleNumberValue = Math.round(100 / Number(buttonRadius?.replace('%', '')))
            setCurrentRadius(Math.round(oneRadius / multipleNumberValue))
          } else {
            setCurrentRadius(buttonRadius)
          }
        }}
      >
        <Pressable
          onPressIn={pressInAnimated}
          onPressOut={pressOutAnimated}
          onPress={handlePress}
          disabled={disabled || isWaiting}
          style={{
            marginBottom: hasBorder ? 4 : 0,
            paddingTop: thickness || 0,
          }}
        >
          {/* Around Border Effect */}
          {hasBorder && (
            <>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  width: '50%',
                  height: '100%',
                  position: 'absolute',
                  bottom: -4,
                  left: -4,
                  borderTopLeftRadius: currentRadius || 0,
                  borderBottomLeftRadius: currentRadius || 0,
                }}
              />
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    transform: [{ translateY: 4 }],
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  width: '50%',
                  height: '100%',
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  borderTopRightRadius: currentRadius || 0,
                  borderBottomRightRadius: currentRadius || 0,
                }}
              />
            </>
          )}

          {/* Press Button Thickness Area */}
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              backgroundColor: backgroundColor,
              borderRadius: currentRadius || 0,
            }}
          >
            {thickness > 0 && (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: currentRadius || 0,
                }}
              />
            )}
          </View>

          {/* Press Button Block Area */}
          <Animated.View
            style={[
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
              boxStyle,
            ]}
          >
            {/* Top Light Effect-Line */}
            <View
              style={{
                width: '100%',
                height: 2,
                position: 'absolute',
                top: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 2,
                  position: 'absolute',
                  top: 0,
                  left: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <View
                style={{
                  width: 24,
                  height: 2,
                  position: 'absolute',
                  top: 0,
                  right: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </View>

            {/* Text Area */}
            {isLoading && (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator size="small" color="#E5E7EB" />
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: isLoading ? 0 : 1,
              }}
            >
              {!!leftIcon && <View>{leftIcon}</View>}
              {typeof buttonText === 'string' ? (
                <Text
                  style={[
                    {
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: 18,
                    },
                    buttonTextStyle,
                  ]}
                >
                  {buttonText || '  '}
                </Text>
              ) : (
                <>{buttonText}</>
              )}
              {!!rightIcon && <View>{rightIcon}</View>}
            </View>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  )
}

export default memo(ArcadeButton)