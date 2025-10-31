// app/(tabs)/config.tsx
import { Input, InputField } from '@/components/ui/input';
import { useAuth } from '@/contexts/authcontexts';
import { supabase } from '@/lib/supabase';
import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, HStack, Text, VStack, Button } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfigScreen() {
  const { session } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (session?.user) loadUserProfile();
  }, [session]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, last_name, phone_number')
        .eq('id', session?.user?.id)
        .single();
      if (!error && data) {
        setUserProfile(data);
        setName(data.name || '');
        setLastName(data.last_name || '');
        setPhone(data.phone_number || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBrazilianPhone = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (text: string) => setPhone(formatBrazilianPhone(text));

  const handleSaveProfile = async () => {
    if (!name.trim() || !lastName.trim()) {
      Alert.alert('Erro', 'Nome e sobrenome são obrigatórios');
      return;
    }
    setEditLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          last_name: lastName.trim(),
          phone_number: phone.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session?.user?.id);
      if (error) throw new Error(error.message);
      await loadUserProfile();
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao atualizar o perfil');
    } finally {
      setEditLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert('Erro', 'Não foi possível fazer logout');
            } else {
              router.replace('/(auth)/login');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
          <Box flex={1} justifyContent="center" alignItems="center" bg="$backgroundLight50">
            <Text>Carregando...</Text>
          </Box>
        </SafeAreaView>
      </GluestackUIProvider>
    );
  }

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
              Configurações
            </Text>

            {/* 用户信息 */}
            <VStack space="lg" mb="$8">
              <HStack justifyContent="space-between" alignItems="center">
                <Text size="xl" fontWeight="bold" color="$blue800">
                  Informações da Conta
                </Text>
                {!isEditing && (
                  <Button size="sm" variant="outline" borderColor="$blue500" onPress={() => setIsEditing(true)}>
                    <Text color="$blue600" fontWeight="bold">Editar</Text>
                  </Button>
                )}
              </HStack>

              <Box
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
                {isEditing ? (
                  <VStack space="lg">
                    {/* Nome */}
                    <Box>
                      <Text size="md" color="$blue800" mb="$2">Nome *</Text>
                      <Input variant="outline" size="md">
                        <InputField
                          placeholder="Seu nome"
                          value={name}
                          onChangeText={setName}
                          autoCapitalize="words"
                          style={{
                            borderWidth: 1,
                            borderColor: '#3b82f6',
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                          }}
                        />
                      </Input>
                    </Box>

                    {/* Sobrenome */}
                    <Box>
                      <Text size="md" color="$blue800" mb="$2">Sobrenome *</Text>
                      <Input variant="outline" size="md">
                        <InputField
                          placeholder="Seu sobrenome"
                          value={lastName}
                          onChangeText={setLastName}
                          autoCapitalize="words"
                          style={{
                            borderWidth: 1,
                            borderColor: '#3b82f6',
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                          }}
                        />
                      </Input>
                    </Box>

                    {/* Telefone */}
                    <Box>
                      <Text size="md" color="$blue800" mb="$2">Telefone</Text>
                      <Input variant="outline" size="md">
                        <InputField
                          placeholder="(11) 99999-9999"
                          value={phone}
                          onChangeText={handlePhoneChange}
                          keyboardType="phone-pad"
                          maxLength={15}
                          style={{
                            borderWidth: 1,
                            borderColor: '#3b82f6',
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                          }}
                        />
                      </Input>
                      <Text size="xs" color="$blue600" mt="$1">Formato: (DDD) 9XXXX-XXXX</Text>
                    </Box>

                    {/* 操作按钮 */}
                    <HStack space="md" mt="$2">
                      <Button variant="outline" borderColor="$blue500" style={{ flex: 1 }} onPress={() => setIsEditing(false)} disabled={editLoading}>
                        <Text color="$blue600" fontWeight="bold">Cancelar</Text>
                      </Button>
                      <Button bg="$blue600" style={{ flex: 1 }} onPress={handleSaveProfile} disabled={editLoading}>
                        <Text color="$white" fontWeight="bold">{editLoading ? 'Salvando...' : 'Salvar'}</Text>
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <VStack space="md">
                    <Box>
                      <Text size="sm" color="$blue800">Nome Completo</Text>
                      <Text size="lg" color="$blue900">{userProfile ? `${userProfile.name} ${userProfile.last_name}` : 'Não informado'}</Text>
                    </Box>
                    <Box>
                      <Text size="sm" color="$blue800">Email</Text>
                      <Text size="lg" color="$blue900">{session?.user?.email}</Text>
                    </Box>
                    <Box>
                      <Text size="sm" color="$blue800">Telefone</Text>
                      <Text size="lg" color="$blue900">{userProfile?.phone_number || 'Não informado'}</Text>
                    </Box>
                  </VStack>
                )}
              </Box>
            </VStack>

            {/* 账户操作 */}
            <VStack space="lg" mb="$8">
              <Text size="xl" fontWeight="bold" color="$blue800">Ações</Text>
              <Box
                bg="$white"
                padding="$6"
                borderRadius="$xl"
                borderWidth="$1"
                borderColor="$blue200"
              >
                <Button variant="outline" borderColor="$red600" onPress={handleLogout}>
                  <Text color="$red600" fontWeight="bold">Sair da Conta</Text>
                </Button>
              </Box>
            </VStack>

            {/* 关于应用 */}
            <VStack space="lg">
              <Text size="xl" fontWeight="bold" color="$blue800">Sobre o App</Text>
              <Box
                bg="$white"
                padding="$6"
                borderRadius="$xl"
                borderWidth="$1"
                borderColor="$blue200"
              >
                <Text size="md" color="$blue800">Versão 1.0.0</Text>
                <Text size="sm" color="$blue600">Desenvolvido para idosos com acessibilidade</Text>
              </Box>
            </VStack>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
