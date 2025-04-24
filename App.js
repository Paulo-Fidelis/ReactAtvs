import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Icon , Button , ListItem} from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const list = [
  {
    name: 'Marcos Andrade',
    icon: 'user',
    num: '81 988553424'
  },
  {
    name: 'Patrícia Tavares',
    icon: 'user',
    num:'81 998765332'
  },
  {
    name: 'Rodrigo Antunes',
    icon: 'user',
    num: '81 987765525'
  }
]


export function HomeScreen({navigation}) {
  return (

  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Contatos </Text>
      <Ionicons
              name="add"
              size={24}
              color="black"
              style={{ marginRight: 10 , marginLeft: '50%'}}
              onPress={() => navigation.navigate('AddContato')}
              />
    </View>
    <View style={styles.containerList}>
    {
    list.map((item, i) => (
      <ListItem key={i} bottomDivider>
        <AntDesign name={item.icon} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Title>{item.num}</ListItem.Title>
          <ListItem.Title><Button style={styles.Button} title="Editar" onPress={() => navigation.navigate('EditContato', {name:item.name,num:item.num})}/></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
    }
    </View>
  </SafeAreaView>
  );
}

export function CadastroScreen() {
  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Cadastro</Text>
    </View>
    <View style={styles.container}>
      <Input style={styles.Input} placeholder='Nome'/>
      <Input style={styles.Input} placeholder='CPF'/>
      <Input style={styles.Input} placeholder='Email'/>
      <Input style={styles.Input} placeholder="Senha" secureTextEntry={true} />

      <Button style={styles.Button} title="Cadastrar"/>
    </View>
  </SafeAreaView>
  );
}

export function CadContato() {
  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Cadastrar contato</Text>
    </View>
    <View style={styles.container}>
      <Input style={styles.Input} placeholder='Nome'/>
      <Input style={styles.Input} placeholder='Email'/>
      <Input style={styles.Input} placeholder='Telefone'/>

      <Button style={styles.Button} title="adicionar"/>
    </View>
  </SafeAreaView>
  );
}

  function App() {
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="AddContato" component={CadContato} />
        <Stack.Screen name="EditContato" component={EditContat} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
function LoginScreen({navigation}) {
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AntDesign 
          name="user" 
          size={30} 
          color="#1890ff" 
          style={{ margin: 10 }}
        />

        <Input style={styles.Input} placeholder='Email'/>
        <Input style={styles.Input} placeholder="Senha" secureTextEntry={true} />

        <Button style={styles.Button} title="Logar" onPress={() => navigation.navigate('Home')}/>
        <Button style={styles.Button} title="Cadastrar" onPress={() => navigation.navigate('Cadastro')}/>

        <Text>esqueci a senha</Text>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>

  );
}

function EditContat({route}){

  const { name, num } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerheader}>
        <Text style={styles.title}> Editar contato</Text>
      </View>
      <View style={styles.container}>
        <Text>Bem-vindo, {name}!</Text>
        <Text>num: {num}</Text>
        <Input style={styles.Input} placeholder='Nome' value={name}/>
        <Input style={styles.Input} placeholder='Email'/>
        <Input style={styles.Input} placeholder='Telefone' value={num}/>

        <Button style={styles.Button} title="adicionar"/>
      </View>
    </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  
  containerheader: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    width: '100%',
    flexDirection: 'row',
  },
  Button: {
    padding : 10,
    width: 200
  },
  Input: {
    marginTop: 10
  },
  title: {
    fontSize: 25
  }
});