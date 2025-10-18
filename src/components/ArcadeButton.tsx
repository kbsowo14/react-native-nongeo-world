import React, { memo, useCallback, useRef, useState } from 'react'
import { 
  ActivityIndicator, 
  Animated, 
  View,
  Pressable,
} from 'react-native'

export interface ArcadeButtonProps {
  backgroundColor?: string
  paddingVertical?: number
  paddingHorizontal?: number
  buttonRadius?: number | string
  thickness?: number
  hasBorder?: boolean
  disabled?: boolean
  isLoading?: boolean | null
  onPress?: () => void
  isFullWidth?: boolean
  children?: React.ReactNode
}

/**
 * 게임화면에 사용되는 3D 스타일 버튼
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
const ArcadeButton: React.FC<ArcadeButtonProps> = ({
  backgroundColor = '#f97316',
  paddingVertical = 12,
  paddingHorizontal = 24,
  buttonRadius = 12,
  thickness = 8,
  hasBorder = true,
  disabled = false,
  isLoading = null,
  onPress,
  isFullWidth = false,
  children,
  ...args
}) => {
  const [currentRadius, setCurrentRadius] = useState<number | null>(null)

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
    if (disabled || isLoading) return
    
    if (typeof onPress === 'function') {
      onPress()
    }
  }, [disabled, isLoading, onPress])

  return (
    <View
      style={[
        isFullWidth && { width: '100%' },
        currentRadius === null && { opacity: 0 },
      ]}
      {...args}
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
          disabled={disabled}
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
                  bottom: -4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
            {isLoading === true && (
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
              {children}
            </View>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  )
}

export default memo(ArcadeButton)