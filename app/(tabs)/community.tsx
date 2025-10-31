import React, { useState } from 'react';
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { 
  GluestackUIProvider, 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Input, 
  InputField, 
  Button, 
  ButtonText 
} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import local_data from '../data/local_data';
import { Event, Comment } from '../data/types';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function CommunityScreen() {
  const [events] = useState<Event[]>(local_data.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedEvent) return;

    const updatedEvent: Event = {
      ...selectedEvent,
      comments: [
        ...selectedEvent.comments,
        {
          id: Date.now().toString(),
          user_name: 'Você',
          content: newComment,
          created_at: new Date().toISOString()
        }
      ]
    };

    setSelectedEvent(updatedEvent);
    setNewComment('');
  };

  if (selectedEvent) {
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          >
            <Box flex={1} bg="$backgroundLight50">
              <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <Box flex={1} padding="$4">
                    {/* 头部 */}
                    <HStack space="md" alignItems="center" mb="$6">
                      <Button
                        variant="outline"
                        size="sm"
                        borderColor="$blue500"
                        onPress={() => setSelectedEvent(null)}
                      >
                        <FontAwesome name="arrow-left" size={16} color="$blue600" />
                      </Button>
                      <Text size="xl" fontWeight="bold" color="$blue800">
                        Detalhes do Evento
                      </Text>
                    </HStack>

                    {/* 活动详情卡片 */}
                    <Box
                      bg="$white"
                      padding="$6"
                      borderRadius="$xl"
                      borderWidth="$1"
                      borderColor="$blue200"
                      mb="$6"
                      shadowColor="$blue200"
                      shadowOffset={{ width: 0, height: 2 }}
                      shadowOpacity={0.1}
                      shadowRadius={8}
                      elevation={2}
                    >
                      <VStack space="lg">
                        <Text size="2xl" fontWeight="bold" color="$blue900">
                          {selectedEvent.title}
                        </Text>
                        <Text size="md" color="$trueGray700" lineHeight="$xl">
                          {selectedEvent.description}
                        </Text>

                        <VStack space="sm">
                          <HStack space="md" alignItems="center">
                            <Box bg="$blue100" p="$2" borderRadius="$full">
                              <FontAwesome name="map-marker" size={16} color="$blue600" />
                            </Box>
                            <Text size="md" color="$trueGray800" fontWeight="medium">
                              {selectedEvent.location}
                            </Text>
                          </HStack>

                          <HStack space="md" alignItems="center">
                            <Box bg="$blue100" p="$2" borderRadius="$full">
                              <FontAwesome name="calendar" size={16} color="$blue600" />
                            </Box>
                            <Text size="md" color="$trueGray800" fontWeight="medium">
                              {formatDate(selectedEvent.event_date)}
                            </Text>
                          </HStack>

                          <HStack space="md" alignItems="center">
                            <Box bg="$blue100" p="$2" borderRadius="$full">
                              <FontAwesome name="users" size={16} color="$blue600" />
                            </Box>
                            <Text size="md" color="$trueGray800" fontWeight="medium">
                              {selectedEvent.participants}/{selectedEvent.max_participants} participantes
                            </Text>
                          </HStack>
                        </VStack>

                        <Box 
                          bg="$blue500" 
                          px="$3" 
                          py="$2" 
                          borderRadius="$lg"
                          alignSelf="flex-start"
                        >
                          <Text size="sm" color="$white" fontWeight="bold">
                            {selectedEvent.category}
                          </Text>
                        </Box>
                      </VStack>
                    </Box>

                    {/* 讨论区 */}
                    <Text size="xl" fontWeight="bold" color="$blue800" mb="$4">
                      Fórum de Discussão ({selectedEvent.comments.length})
                    </Text>

                    <VStack space="md" mb="$4">
                      {selectedEvent.comments.map((comment: Comment) => (
                        <Box
                          key={comment.id}
                          bg="$white"
                          padding="$4"
                          borderRadius="$lg"
                          borderWidth="$1"
                          borderColor="$blue100"
                        >
                          <VStack space="sm">
                            <HStack justifyContent="space-between" alignItems="center">
                              <Text size="md" fontWeight="bold" color="$blue900">
                                {comment.user_name}
                              </Text>
                              <Text size="xs" color="$trueGray500">
                                {formatDate(comment.created_at)}
                              </Text>
                            </HStack>
                            <Text size="sm" color="$trueGray700" lineHeight="$lg">
                              {comment.content}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </TouchableWithoutFeedback>
              </ScrollView>

              {/* 评论输入框 */}
              <Box 
                bg="$white" 
                padding="$4" 
                borderTopWidth="$1"
                borderColor="$blue200"
                shadowColor="$blue200"
                shadowOffset={{ width: 0, height: -2 }}
                shadowOpacity={0.1}
                shadowRadius={8}
              >
                <VStack space="md">
                  <Input variant="outline" size="md" borderColor="$blue300">
                    <InputField
                      placeholder="Escreva seu comentário..."
                      value={newComment}
                      onChangeText={setNewComment}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                  </Input>
                  <Button 
                    onPress={handleAddComment} 
                    disabled={!newComment.trim()}
                    bg={!newComment.trim() ? "$trueGray400" : "$blue600"}
                    borderRadius="$lg"
                  >
                    <ButtonText fontWeight="bold">
                      Enviar Comentário
                    </ButtonText>
                  </Button>
                </VStack>
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </GluestackUIProvider>
    );
  }

  // 活动列表页面
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
              Comunidade
            </Text>

            <VStack space="lg">
              {events.map((event) => (
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
                  <VStack space="lg">
                    <VStack space="sm">
                      <Text size="xl" fontWeight="bold" color="$blue900">
                        {event.title}
                      </Text>
                      <Text size="md" color="$trueGray700" lineHeight="$lg" numberOfLines={2}>
                        {event.description}
                      </Text>
                    </VStack>

                    <VStack space="sm">
                      <HStack space="md" alignItems="center">
                        <Box bg="$blue100" p="$2" borderRadius="$full">
                          <FontAwesome name="map-marker" size={14} color="$blue600" />
                        </Box>
                        <Text size="sm" color="$trueGray800" fontWeight="medium">
                          {event.location}
                        </Text>
                      </HStack>

                      <HStack space="md" alignItems="center">
                        <Box bg="$blue100" p="$2" borderRadius="$full">
                          <FontAwesome name="calendar" size={14} color="$blue600" />
                        </Box>
                        <Text size="sm" color="$trueGray800" fontWeight="medium">
                          {formatDate(event.event_date)}
                        </Text>
                      </HStack>

                      <HStack space="md" alignItems="center">
                        <Box bg="$blue100" p="$2" borderRadius="$full">
                          <FontAwesome name="users" size={14} color="$blue600" />
                        </Box>
                        <Text size="sm" color="$trueGray800" fontWeight="medium">
                          {event.participants}/{event.max_participants} participantes
                        </Text>
                      </HStack>
                    </VStack>

                    <HStack justifyContent="space-between" alignItems="center">
                      <Box 
                        bg="$blue500" 
                        px="$3" 
                        py="$1" 
                        borderRadius="$lg"
                      >
                        <Text size="xs" color="$white" fontWeight="bold">
                          {event.category}
                        </Text>
                      </Box>
                      
                      <HStack space="xs" alignItems="center">
                        <FontAwesome name="comments" size={12} color="#6b7280" />
                        <Text size="xs" color="$trueGray600" fontWeight="medium">
                          {event.comments.length} comentários
                        </Text>
                      </HStack>
                    </HStack>

                    <Button
                      variant="solid"
                      bg="$blue600"
                      borderRadius="$lg"
                      onPress={() => setSelectedEvent(event)}
                    >
                      <ButtonText fontWeight="bold">
                        Ver Detalhes e Participar
                      </ButtonText>
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
