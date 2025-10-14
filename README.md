# react-native-nongeo-world

React Native 컴포넌트 라이브러리

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

```jsx
import { Button } from 'react-native-nongeo-world';

<Button 
  title="클릭하세요" 
  onPress={() => console.log('버튼 클릭!')}
/>
```

### Input

```jsx
import { Input } from 'react-native-nongeo-world';

<Input
  label="이메일"
  placeholder="이메일을 입력하세요"
  value={email}
  onChangeText={setEmail}
/>
```

### Card

```jsx
import { Card } from 'react-native-nongeo-world';

<Card>
  <Text>카드 안의 내용</Text>
</Card>
```

## 라이센스

MIT

