// app/(tabs)/index.tsx
import { FontAwesome } from '@expo/vector-icons';
import { config } from '@gluestack-ui/config';
import {
  Box,
  Button,
  GluestackUIProvider,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Linking, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import mockData from '../data/local_data';
import { HomeData } from '../data/types';

import { useAuth } from '@/contexts/authcontexts';
import { supabase } from '@/lib/supabase';

import React, { useEffect, useState } from 'react';

// 日期格式化
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 星级组件
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <HStack space="xs" alignItems="center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <FontAwesome key={index} name="star" size={14} color="#d97706" />;
        } else if (index === fullStars && hasHalfStar) {
          return <FontAwesome key={index} name="star-half-full" size={14} color="#d97706" />;
        } else {
          return <FontAwesome key={index} name="star-o" size={14} color="#9ca3af" />;
        }
      })}
    </HStack>
  );
};

export default function HomeScreen() {
  const { session } = useAuth();
  const [userProfile, setUserProfile] = useState<{ name: string; last_name: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const homeData: HomeData = mockData.homeData;
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  // 加载用户资料
  useEffect(() => {
    if (session?.user) loadUserProfile();
  }, [session]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, last_name')
        .eq('id', session?.user?.id)
        .single();
      if (!error && data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 100,
            backgroundColor: '#f8fafc',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Box flex={1} padding="$4" bg="$backgroundLight50" minHeight={height}>
            {/* 欢迎标题 */}
            <Box mb="$8">
              <Text size="3xl" fontWeight="bold" color="$blue800" mb="$2" textAlign="center">
                {`Bem-vindo${userProfile ? `, ${userProfile.name}` : ''}!`}
              </Text>
              <Text size="lg" color="$blue600" fontWeight="medium" textAlign="center">
                Cuidando de você com carinho e atenção
              </Text>
            </Box>

            {/* 紧急联系人 */}
            <Text size="xl" fontWeight="bold" color="$blue800" mb="$4">
              Contatos de Emergência
            </Text>
            <VStack space="md" mb="$8">
              {homeData.emergencyContacts.map((contact) => (
                <Button
                  key={contact.id}
                  variant="solid"
                  size="lg"
                  bg={contact.type === 'emergency' ? '$red600' : '$blue600'}
                  onPress={() => handleCall(contact.phone)}
                  borderRadius="$xl"
                  shadowColor="$blue200"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={8}
                  elevation={2}
                >
                  <HStack space="md" alignItems="center" justifyContent="space-between" width="100%">
                    <VStack space="xs" flex={1}>
                      <Text color="$white" fontWeight="bold" size="md">
                        {contact.name}
                      </Text>
                    </VStack>
                    <FontAwesome name="chevron-right" size={14} color="white" opacity={0.8} />
                  </HStack>
                </Button>
              ))}
            </VStack>

            {/* 健康贴士 */}
            <Text size="xl" fontWeight="bold" color="$blue800" mb="$4">
              Dicas de Saúde
            </Text>
            <VStack space="lg" mb="$8">
              {homeData.healthTips.map((tip) => (
                <Box
                  key={tip.id}
                  bg="$white"
                  padding="$6"
                  borderRadius="$xl"
                  borderWidth="$1"
                  borderColor="$blue200"
                  shadowColor="$blue200"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={8}
                  elevation={2}
                >
                  <VStack space="md">
                    <Text size="xl" fontWeight="bold" color="$blue900">
                      {tip.title}
                    </Text>
                    <Text size="md" color="$trueGray700" lineHeight="$lg" numberOfLines={3}>
                      {tip.content}
                    </Text>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Box bg="$blue500" px="$3" py="$1" borderRadius="$lg">
                        <Text size="sm" color="$white" fontWeight="bold">
                          {tip.category}
                        </Text>
                      </Box>
                      <Text size="sm" color="$blue600" fontWeight="medium">
                        {tip.read_time} min leitura
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>

            {/* 服务模块 */}
            <Text size="xl" fontWeight="bold" color="$blue800" mb="$4">
              Serviços em Destaque
            </Text>
            <VStack space="lg" mb="$8">
              {homeData.featuredServices.map((service) => (
                <Box
                  key={service.id}
                  bg="$white"
                  padding="$6"
                  borderRadius="$xl"
                  borderWidth="$1"
                  borderColor="$blue200"
                  shadowColor="$blue200"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={8}
                  elevation={2}
                >
                  <VStack space="md">
                    <Text size="xl" fontWeight="bold" color="$blue900">
                      {service.title}
                    </Text>
                    <Text size="md" color="$blue700" fontWeight="medium">
                      {service.profession}
                    </Text>
                    <HStack justifyContent="space-between" alignItems="center">
                      <StarRating rating={service.rating} />
                      <Text size="xl" fontWeight="bold" color="$blue800">
                        R$ {service.hourly_rate}/hora
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>

            {/* 活动部分 */}
            <Text size="xl" fontWeight="bold" color="$blue800" mb="$4">
              Próximos Eventos
            </Text>
            <VStack space="lg">
              {homeData.upcomingEvents.map((event) => (
                <Box
                  key={event.id}
                  bg="$white"
                  padding="$6"
                  borderRadius="$xl"
                  borderWidth="$1"
                  borderColor="$blue200"
                  shadowColor="$blue200"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={8}
                  elevation={2}
                >
                  <VStack space="md">
                    <Text size="xl" fontWeight="bold" color="$blue900">
                      {event.title}
                    </Text>
                    <Text size="md" color="$trueGray700" lineHeight="$lg" numberOfLines={2}>
                      {event.description}
                    </Text>
                    <VStack space="sm">
                      <HStack space="md" alignItems="center">
                        <FontAwesome name="map-marker" size={14} color="#3b82f6" />
                        <Text size="md" color="$trueGray800" fontWeight="medium">
                          {event.location}
                        </Text>
                      </HStack>
                      <HStack space="md" alignItems="center">
                        <FontAwesome name="calendar" size={14} color="#3b82f6" />
                        <Text size="md" color="$trueGray800" fontWeight="medium">
                          {formatDate(event.event_date)}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
