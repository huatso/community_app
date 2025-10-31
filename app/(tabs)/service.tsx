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
import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import local_data from '../data/local_data';
import { Service } from '../data/types';

// 星级评分组件
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
      <Text size="sm" color="$trueGray700" ml="$2" fontWeight="medium">
        {rating.toFixed(1)}
      </Text>
    </HStack>
  );
};

export default function ServiceScreen() {
  const services: Service[] = local_data.services;

  const handleContact = (service: Service) => {
    const message = `Olá ${service.provider.name}! Gostaria de saber mais sobre seus serviços de ${service.title}.`;
    const phoneNumber = '5511999999999';
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`).catch(() => {
      Linking.openURL(`tel:${phoneNumber}`);
    });
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Box flex={1} padding="$4" bg="$backgroundLight50">
            <Text size="2xl" fontWeight="bold" textAlign="center" mb="$8" color="$blue800">
              Serviços de Cuidados
            </Text>

            <VStack space="lg">
              {services.map((service) => (
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
                  <VStack space="lg">
                    {/* 头部信息 */}
                    <HStack justifyContent="space-between" alignItems="flex-start">
                      <VStack space="sm" flex={1}>
                        <Text size="xl" fontWeight="bold" color="$blue900">
                          {service.title}
                        </Text>
                        <Text size="md" color="$blue700" fontWeight="medium">
                          {service.profession}
                        </Text>
                      </VStack>
                      {service.is_verified && (
                        <Box
                          bg="$blue500"
                          px="$3"
                          py="$1"
                          borderRadius="$lg"
                          borderWidth="$1"
                          borderColor="$blue400"
                        >
                          <HStack space="xs" alignItems="center">
                            <FontAwesome name="check-circle" size={12} color="white" />
                            <Text size="xs" color="$white" fontWeight="bold">
                              Verificado
                            </Text>
                          </HStack>
                        </Box>
                      )}
                    </HStack>

                    {/* 服务提供者信息 */}
                    <HStack space="md" alignItems="center">
                      <Box
                        bg="$blue100"
                        width="$12"
                        height="$12"
                        borderRadius="$full"
                        justifyContent="center"
                        alignItems="center"
                        borderWidth="$2"
                        borderColor="$blue300"
                      >
                        <FontAwesome name="user" size={20} color="$blue600" />
                      </Box>
                      <VStack space="xs" flex={1}>
                        <Text size="lg" fontWeight="semibold" color="$blue900">
                          {service.provider.name}
                        </Text>
                        <HStack space="xs" alignItems="center">
                          <FontAwesome name="map-marker" size={12} color="$blue600" />
                          <Text size="md" color="$blue700" fontWeight="medium">
                            {service.location}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    {/* 经验和价格 */}
                    <HStack justifyContent="space-between" alignItems="center">
                      <HStack space="xs" alignItems="center">
                        <FontAwesome name="briefcase" size={12} color="$blue600" />
                        <Text size="md" color="$blue800" fontWeight="medium">
                          {service.experience_years} anos
                        </Text>
                      </HStack>
                      <HStack space="xs" alignItems="center">
                        <FontAwesome name="money" size={14} color="$blue600" />
                        <Text size="xl" fontWeight="bold" color="$blue800">
                          R$ {service.hourly_rate}/hora
                        </Text>
                      </HStack>
                    </HStack>

                    {/* 评分 */}
                    <HStack justifyContent="space-between" alignItems="center">
                      <StarRating rating={service.rating} />
                      <Text size="md" color="$blue600" fontWeight="medium">
                        {service.review_count} avaliações
                      </Text>
                    </HStack>

                    {/* 联系按钮 */}
                    <Button
                      bg="$blue600"
                      borderRadius="$lg"
                      onPress={() => handleContact(service)}
                      shadowColor="$blue200"
                      shadowOffset={{ width: 0, height: 2 }}
                      shadowOpacity={0.2}
                      shadowRadius={4}
                    >
                      <HStack space="sm" alignItems="center" justifyContent="center">
                        <FontAwesome name="whatsapp" size={18} color="white" />
                        <Text color="$white" fontWeight="bold" size="md">
                          Entrar em Contato
                        </Text>
                      </HStack>
                    </Button>
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
