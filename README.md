# react-native-nongeo-world

React Native 컴포넌트 라이브러리 (TypeScript 지원)

## ✨ 특징

- 📦 즉시 사용 가능한 React Native 컴포넌트
- 🎨 깔끔하고 현대적인 디자인
- 📘 TypeScript로 작성되어 완벽한 타입 지원
- 🔧 커스터마이징 가능한 스타일

## 설치

```bash
npm install react-native-nongeo-world
```

또는

```bash
yarn add react-native-nongeo-world
```

## 사용법

### Button

```tsx
import { Button } from 'react-native-nongeo-world';

<Button 
  title="클릭하세요" 
  onPress={() => console.log('버튼 클릭!')}
  disabled={false}
/>
```

#### Props
- `title` (string) - 버튼 텍스트
- `onPress` (() => void) - 클릭 이벤트 핸들러
- `style?` (ViewStyle) - 커스텀 버튼 스타일
- `textStyle?` (TextStyle) - 커스텀 텍스트 스타일
- `disabled?` (boolean) - 비활성화 여부

### Input

```tsx
import { Input } from 'react-native-nongeo-world';

<Input
  label="이메일"
  placeholder="이메일을 입력하세요"
  value={email}
  onChangeText={setEmail}
  error={error}
/>
```

#### Props
- `label?` (string) - 입력 필드 라벨
- `placeholder?` (string) - 플레이스홀더 텍스트
- `value?` (string) - 입력 값
- `onChangeText?` ((text: string) => void) - 텍스트 변경 핸들러
- `error?` (string) - 에러 메시지
- `style?` (TextStyle) - 커스텀 입력 필드 스타일
- 기타 모든 `TextInput` props

### Card

```tsx
import { Card } from 'react-native-nongeo-world';
import { Text } from 'react-native';

<Card>
  <Text>카드 안의 내용</Text>
</Card>
```

#### Props
- `children` (React.ReactNode) - 카드 내부 컨텐츠
- `style?` (ViewStyle) - 커스텀 카드 스타일

## TypeScript

모든 컴포넌트는 TypeScript로 작성되었으며, 타입 정의가 포함되어 있습니다.

```tsx
import { ButtonProps, InputProps, CardProps } from 'react-native-nongeo-world';
```

## 라이센스

MIT © Nongeoking

