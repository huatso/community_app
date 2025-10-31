// // Auth.tsx
// import React, { useState, useEffect } from 'react'
// import { Alert, AppState } from 'react-native'

// // UI 组件
// import { Box } from '@gluestack-ui/themed'
// import { Input, InputField } from '@/components/ui/input'
// import { Button, ButtonText } from '@/components/ui/button'

// import { supabase } from '../lib/supabase'

// export default function Auth() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   // 🔄 自动刷新 Supabase Token
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', (state) => {
//       if (state === 'active') {
//         supabase.auth.startAutoRefresh()
//       } else {
//         supabase.auth.stopAutoRefresh()
//       }
//     })
//     return () => subscription.remove()
//   }, [])

//   // 登录函数
//   async function signInWithEmail() {
//     setLoading(true)
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })
//     if (error) Alert.alert(error.message)
//     setLoading(false)
//   }

//   // 注册函数
//   async function signUpWithEmail() {
//     setLoading(true)
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.signUp({ email, password })
//     if (error) Alert.alert(error.message)
//     if (!session) Alert.alert('Please check your inbox for email verification!')
//     setLoading(false)
//   }

//   return (
//     <Box flex={1} padding="$4" mt="$10" justifyContent="center">
//       {/* Email 输入框 */}
//       <Box mb="$4">
//         <Input variant="outline" size="md">
//           <InputField
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           />
//         </Input>
//       </Box>

//       {/* Password 输入框 */}
//       <Box mb="$4">
//         <Input variant="outline" size="md">
//           <InputField
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             autoCapitalize="none"
//           />
//         </Input>
//       </Box>

//       {/* 登录按钮 */}
//       <Box mb="$2">
//         <Button
//           size="md"
//           action="primary"
//           onPress={signInWithEmail}
//           disabled={loading}
//         >
//           <ButtonText>{loading ? 'Signing in...' : 'Sign in'}</ButtonText>
//         </Button>
//       </Box>

//       {/* 注册按钮 */}
//       <Button
//         size="md"
//         action="secondary"
//         variant="outline"
//         onPress={signUpWithEmail}
//         disabled={loading}
//       >
//         <ButtonText>{loading ? 'Signing up...' : 'Sign up'}</ButtonText>
//       </Button>
//     </Box>
//   )
// }

