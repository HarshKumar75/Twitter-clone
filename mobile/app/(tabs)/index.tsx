import SignOutButton from '@/components/SignOutButton';
import { useUserSync } from '@/hooks/useUserSync';
import { Text, View , ScrollView, RefreshControl} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { usePosts } from '@/hooks/usePost';
import PostComposer from '@/components/PostComposer';
import PostsList from '@/components/PostList';

const HomeScreen = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const { refetch: refetchPosts } = usePosts();

  const handlePullToRefresh = async () => {
    setIsRefetching(true);

    await refetchPosts();
    setIsRefetching(false);
  };
  useUserSync(); // This will trigger user sync automatically
    return (
      <SafeAreaView className='flex-1'>
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
          <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          <Text className="text-xl font-bold text-gray-900">Home</Text>
          <SignOutButton />
        </View>

        <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handlePullToRefresh}
            tintColor={"#1DA1F2"}
          />
        }
      >
        <PostComposer />
        <PostsList />
        </ScrollView>
      </SafeAreaView>
    );
};

export default HomeScreen;