import SignOutButton from '@/components/SignOutButton';
import { useUserSync } from '@/hooks/useUserSync';
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  useUserSync(); // This will trigger user sync automatically
    return (
      <SafeAreaView className='flex-1'>
        <Text> HomeScreen </Text>
        <SignOutButton />
      </SafeAreaView>
    );
};

export default HomeScreen;