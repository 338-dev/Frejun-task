import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import { store } from './store/store';
import { Provider } from 'react-redux';
import PostsDetails from './Components/PostsDetails';
import PostsModal from './Components/PostsModal';
import { useState } from 'react';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {

const Stack = createNativeStackNavigator();
const [visible, setVisible] = useState(false);


return (
    <Provider store={store}>
    <NavigationContainer>
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name="user" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="home" component={HomePage} options={{headerRight: () => < TouchableOpacity onPress={()=>setVisible(true)}>
      <Icon type="entypo" name="plus" />
      </TouchableOpacity>}}/>
      <Stack.Screen name="post description" component={PostsDetails}/>
      </Stack.Navigator >
    </View>
      <PostsModal visible={visible} setVisible={setVisible}/>
    </NavigationContainer>
    </Provider>

    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: Platform.OS === 'web'?350:width,
    height: '100%',
    margin:'auto',
  },
});
