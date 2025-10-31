// app/(auth)/login.tsx - 添加忘记密码功能
import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GluestackUIProvider, Box, Text, VStack } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '@/contexts/authcontexts';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
    }
  }, [session]);

  // Função de login
  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      Alert.alert('Erro de Login', error.message);
    }
    setLoading(false);
  }

  // Função de registro
  async function signUpWithEmail() {
    if (!email || !password || !name || !lastName) {
      Alert.alert('Informações incompletas', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    
    try {
      // Criar usuário de autenticação
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password
      });

      if (authError) {
        throw new Error(`Falha na autenticação: ${authError.message}`);
      }

      if (authData.user) {
        // Criar perfil do usuário
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            name: name,
            last_name: lastName,
            phone_number: phoneNumber || null,
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          throw new Error(`Falha ao criar perfil: ${profileError.message}`);
        }
        
        Alert.alert(
          'Conta Criada!', 
          'Sua conta foi criada com sucesso.',
          [
            { 
              text: 'Voltar para Login', 
              onPress: resetForm
            }
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  // Função para recuperação de senha
  async function handleForgotPassword() {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu email');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'myapp://reset-password', // Você pode configurar uma rota específica
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert(
        'Email Enviado',
        'Enviamos um link para redefinir sua senha para o seu email. Por favor, verifique sua caixa de entrada.',
        [
          {
            text: 'OK',
            onPress: () => setIsForgotPassword(false)
          }
        ]
      );
    }
    setLoading(false);
  }

  // Função para resetar formulário
  const resetForm = () => {
    setName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setIsSignUp(false);
    setIsForgotPassword(false);
  };

  // Renderizar formulário de recuperação de senha
  const renderForgotPassword = () => (
    <VStack space="md">
      <Text size="xl" fontWeight="bold" textAlign="center" mb="$4">
        Recuperar Senha
      </Text>

      <Text textAlign="center" mb="$4" color="$textLight600">
        Digite seu email para receber um link de redefinição de senha
      </Text>

      <Box>
        <Text mb="$2" size="sm" fontWeight="medium">Email *</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Input>
      </Box>

      <Button onPress={handleForgotPassword} disabled={loading}>
        <ButtonText>
          {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </ButtonText>
      </Button>

      <Text 
        mt="$2" 
        textAlign="center" 
        size="sm" 
        color="$primary500" 
        onPress={() => setIsForgotPassword(false)}
        style={{ textDecorationLine: 'underline' }}
      >
        ← Voltar para Login
      </Text>
    </VStack>
  );

  // Renderizar formulário de registro
  const renderSignUp = () => (
    <VStack space="md">
      <Text size="xl" fontWeight="bold" textAlign="center" mb="$4">
        Criar Nova Conta
      </Text>

      <Box>
        <Text mb="$2" size="sm" fontWeight="medium">Nome *</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </Input>
      </Box>

      <Box>
        <Text mb="$2" size="sm" fontWeight="medium">Sobrenome *</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Seu sobrenome"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </Input>
      </Box>

      <Box>
        <Text mb="$2" size="sm" fontWeight="medium">Email *</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        </Input>
      </Box>

      <Box>
        <Text mb="$2" size="sm" fontWeight="medium">Senha *</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="next"
          />
        </Input>
      </Box>

      <Box mb="$4">
        <Text mb="$2" size="sm" fontWeight="medium">Número de Telefone</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Opcional"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            returnKeyType="done"
          />
        </Input>
      </Box>

      <Button onPress={signUpWithEmail} disabled={loading}>
        <ButtonText>
          {loading ? 'Criando Conta...' : 'Criar Conta'}
        </ButtonText>
      </Button>

      <Text 
        mt="$2" 
        textAlign="center" 
        size="sm" 
        color="$primary500" 
        onPress={resetForm}
        style={{ textDecorationLine: 'underline' }}
      >
        ← Voltar para Login
      </Text>
    </VStack>
  );

  // Renderizar formulário de login
  const renderLogin = () => (
    <VStack space="md">
      <Text size="2xl" fontWeight="bold" textAlign="center" mb="$6">
        Bem-vindo de Volta
      </Text>

      <Box>
        <Text mb="$2" size="sm" fontWeight="medium">Email</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        </Input>
      </Box>

      <Box mb="$2">
        <Text mb="$2" size="sm" fontWeight="medium">Senha</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
          />
        </Input>
      </Box>

      {/* Link para esqueci a senha */}
      <Text 
        textAlign="right" 
        size="sm" 
        color="$primary500" 
        onPress={() => setIsForgotPassword(true)}
        style={{ textDecorationLine: 'underline' }}
        mb="$4"
      >
        Esqueci minha senha
      </Text>

      <Button onPress={signInWithEmail} disabled={loading}>
        <ButtonText>{loading ? 'Entrando...' : 'Entrar'}</ButtonText>
      </Button>

      <Button variant="outline" onPress={() => setIsSignUp(true)}>
        <ButtonText>Criar Nova Conta</ButtonText>
      </Button>
    </VStack>
  );

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Box flex={1} padding="$4" justifyContent="center" bg="$backgroundLight50">
              {isForgotPassword ? renderForgotPassword() : 
               isSignUp ? renderSignUp() : renderLogin()}
            </Box>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}