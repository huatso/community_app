// // app/components/Account.tsx
// import React, { useState, useEffect } from 'react'
// import { Alert } from 'react-native'
// import { supabase } from '../lib/supabase'
// import { Session } from '@supabase/supabase-js'

// // 从 Gluestack 导入组件
// import {
//   Box,
//   Text,
//   Input,
//   InputField,
//   Button,
//   ButtonText,
// } from '@gluestack-ui/themed'

// export default function Account({ session }: { session: Session }) {
//   const [loading, setLoading] = useState(true)
//   const [username, setUsername] = useState('')
//   const [website, setWebsite] = useState('')
//   const [avatarUrl, setAvatarUrl] = useState('')

//   useEffect(() => {
//     if (session) getProfile()
//   }, [session])

//   async function getProfile() {
//     try {
//       setLoading(true)
//       if (!session?.user) throw new Error('No user on the session!')

//       const { data, error, status } = await supabase
//         .from('profiles')
//         .select(`username, website, avatar_url`)
//         .eq('id', session?.user.id)
//         .single()

//       if (error && status !== 406) throw error

//       if (data) {
//         setUsername(data.username || '')
//         setWebsite(data.website || '')
//         setAvatarUrl(data.avatar_url || '')
//       }
//     } catch (error) {
//       if (error instanceof Error) Alert.alert(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function updateProfile({
//     username,
//     website,
//     avatar_url,
//   }: {
//     username: string
//     website: string
//     avatar_url: string
//   }) {
//     try {
//       setLoading(true)
//       if (!session?.user) throw new Error('No user on the session!')

//       const updates = {
//         id: session.user.id,
//         username,
//         website,
//         avatar_url,
//         updated_at: new Date(),
//       }

//       const { error } = await supabase.from('profiles').upsert(updates)
//       if (error) throw error
//       Alert.alert('Profile updated!')
//     } catch (error) {
//       if (error instanceof Error) Alert.alert(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Box flex={1} padding="$4" mt="$8">
//       {/* Email */}
//       <Box mb="$4">
//         <Text mb="$1" size="sm" color="$textLight700">
//           Email
//         </Text>
//         <Input variant="outline" size="md" isDisabled>
//           <InputField value={session?.user?.email || ''} editable={false} />
//         </Input>
//       </Box>

//       {/* Username */}
//       <Box mb="$4">
//         <Text mb="$1" size="sm" color="$textLight700">
//           Username
//         </Text>
//         <Input variant="outline" size="md">
//           <InputField
//             placeholder="Enter your username"
//             value={username}
//             onChangeText={setUsername}
//           />
//         </Input>
//       </Box>

//       {/* Website */}
//       <Box mb="$6">
//         <Text mb="$1" size="sm" color="$textLight700">
//           Website
//         </Text>
//         <Input variant="outline" size="md">
//           <InputField
//             placeholder="Enter your website"
//             value={website}
//             onChangeText={setWebsite}
//           />
//         </Input>
//       </Box>

//       {/* Update Button */}
//       <Box mb="$4">
//         <Button
//           size="md"
//           action="primary"
//           onPress={() =>
//             updateProfile({ username, website, avatar_url: avatarUrl })
//           }
//           disabled={loading}
//         >
//           <ButtonText>{loading ? 'Loading...' : 'Update'}</ButtonText>
//         </Button>
//       </Box>

//       {/* Sign Out */}
//       <Button
//         size="md"
//         action="secondary"
//         variant="outline"
//         onPress={() => supabase.auth.signOut()}
//         disabled={loading}
//       >
//         <ButtonText>Sign Out</ButtonText>
//       </Button>
//     </Box>
//   )
// }
