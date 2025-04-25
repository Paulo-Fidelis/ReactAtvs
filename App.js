import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Icon , Button , ListItem} from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const Stack = createNativeStackNavigator();

export default App;

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

export function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const saveUser = () => {
    axios.post('http://localhost:3000/user', {
      nome, cpf, senha
    })
    .then(() => navigation.navigate('Login'))
    .catch((err) => console.log(err));
  };

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Cadastro</Text>
    </View>
    <View style={styles.container}>
      <Input style={styles.Input} placeholder='Nome' value={nome} onChangeText={setNome}/>
      <Input style={styles.Input} placeholder='CPF' value={cpf} onChangeText={setCpf}/>
      <Input style={styles.Input} placeholder='Email' value={email} onChangeText={setEmail}/>
      <Input style={styles.Input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} />
      <Button style={styles.Button} title="Cadastrar" onPress={saveUser}/>
    </View>
  </SafeAreaView>
  );
}

export function HomeScreen({ navigation, route}) {
  const [contatos, setContatos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  
   useEffect(() => {
    axios.get('http://localhost:3000/contacts')
      .then((response) => {
        setContatos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar contatos:', error);
        setLoading(false);
      });
  }, []);
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
    contatos.map((item, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.nome}</ListItem.Title>
            <ListItem.Title>{item.email}</ListItem.Title>
            <ListItem.Title>{item.cpf}</ListItem.Title>
            <ListItem.Title>{item.num}</ListItem.Title>
            <ListItem.Title><Button style={styles.Button} title="Editar" onPress={() => navigation.navigate('EditContato', {contatos: item})}/></ListItem.Title>
          </ListItem.Content>
        </ListItem>
    ))
    }   
    </View>
  </SafeAreaView>
  );
}



export function CadContato({navigation}) {
  const [num, setNum] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const saveCont = () => {
    axios.post('http://localhost:3000/contacts', {
      num, nome, email
    })
    .then(() => navigation.navigate('Home'))
    .catch((err) => console.log(err));
  };
  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Cadastrar contato</Text>
    </View>
    <View style={styles.container}>
      <Input style={styles.Input} placeholder='nome' value={nome} onChangeText={setNome}/>
      <Input style={styles.Input} placeholder='Email' value={email} onChangeText={setEmail}/>
      <Input style={styles.Input} placeholder='Telefone' value={num} onChangeText={setNum}/>

      <Button style={styles.Button} title="adicionar" onPress={saveCont}/>
    </View>
  </SafeAreaView>
  );
}

function EditContat({ navigation, route}){
  const { contatos } = route.params;
  const [num, setNum] = useState(contatos.num);
  const [nome, setNome] = useState(contatos.nome);
  const [email, setEmail] = useState(contatos.email);


  const deleteContat = (id) => {
    axios.delete(`http://localhost:3000/contacts/${contatos.id}`)
    .then((response) => {
      setContatos(response.data);
      setLoading(false);
    } , navigation.navigate('Home'))
    .catch((error) => {
      console.error('Erro ao buscar contatos:', error);
      setLoading(false);
    });
  }

  const attContat = () => {
    axios.put(`http://localhost:3000/contacts/${contatos.id}`, {
      ...contatos,
      nome,
      num,
      email
    })
    .then(() => navigation.navigate('Home'))
    .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerheader}>
        <Text style={styles.title}> Editar contato</Text>
      </View>
      <View style={styles.container}>
        <Text>Bem-vindo, {contatos.nome}!</Text>
        <Text>num: {contatos.num}</Text>
        <Input style={styles.Input} placeholder='Nome' value={nome} onChangeText={setNome}/>
        <Input style={styles.Input} placeholder='Email'value={email} onChangeText={setEmail}/>
        <Input style={styles.Input} placeholder='Telefone' value={num} onChangeText={setNum}/>

        <Button style={styles.Button} title="Atualizar" onPress={attContat}/>
        <Button style={styles.Button} title="Excluir" onPress={deleteContat}/>
      </View>
    </SafeAreaView>
    );
}



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