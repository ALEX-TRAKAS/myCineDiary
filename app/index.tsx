import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function Index() {
  if (Platform.OS === 'web') {
    return <Redirect href="/web/home" />;
  }
  return <Redirect href="/home" />;
}
