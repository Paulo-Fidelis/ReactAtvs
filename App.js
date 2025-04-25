import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { Input, Button, Text, Avatar, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const Stack = createStackNavigator();

function telalogin({ navigation }) {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Avatar
            size="large"
            rounded
            source={{ uri: "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png" }}
            containerStyle={styles.avatar}
          />
          <Text h3 style={styles.title}>Bem-vindo</Text>

          <Input
            placeholder='Email'
            leftIcon={{ type: 'material', name: 'email', color: '#fff' }}
            autoCapitalize='none'
            inputStyle={styles.inputText}
            placeholderTextColor="#ddd"
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder='Senha'
            leftIcon={{ type: 'material', name: 'lock', color: '#fff' }}
            secureTextEntry
            inputStyle={styles.inputText}
            placeholderTextColor="#ddd"
            inputContainerStyle={styles.inputContainer}
          />

          <View style={styles.buttonGroup}>
            <Button
              title="Login"
              buttonStyle={styles.primaryButton}
              titleStyle={styles.buttonTitle}
              onPress={() => navigation.navigate('ListaCon')}
            />
            <Button
              title="Cadastrar"
              type="outline"
              buttonStyle={styles.secondaryButton}
              titleStyle={[styles.buttonTitle, { color: '#fff' }]}
              onPress={() => navigation.navigate('Cadastrar')}
            />
           
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function Cadastrar({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvarUsuario = () => {
    axios.post('http://localhost:3000/usuarios', {
      nome, cpf, email, senha
    })
    .then(() => navigation.navigate('telalogin'))
    .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Usuário</Text>
      <Input placeholder='Nome' leftIcon={{ type: 'material', name: 'person' }} value={nome} onChangeText={setNome} />
      <Input placeholder='CPF' leftIcon={{ type: 'material', name: 'badge' }} value={cpf} onChangeText={setCpf} />
      <Input placeholder='Email' leftIcon={{ type: 'material', name: 'email' }} value={email} onChangeText={setEmail} />
      <Input placeholder='Senha' leftIcon={{ type: 'material', name: 'lock' }} secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Salvar" buttonStyle={styles.button} onPress={salvarUsuario} />
    </View>
  );
}

function ListaCon({ navigation }) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Usuário</Text>
      <Button title="Meus contatos" buttonStyle={styles.button} onPress={() => navigation.navigate('meusctt')} />
    </View>
  );
}

function DetalhesContato({ navigation, route }) {
  const { contato } = route.params;

  return (
    <View style={styles.container}>
      <Avatar size="xlarge" rounded source={{ uri: contato.avatar }} containerStyle={styles.avatar} />
      <Text h3 style={styles.detailTitle}>{contato.name}</Text>
      <Text h4 style={styles.detailSubtitle}>{contato.numero}</Text>
      <Button title="Editar" buttonStyle={styles.button} onPress={() => navigation.navigate('EditarContato', { contato })} />
      <Button title="Voltar" buttonStyle={styles.button} onPress={() => navigation.goBack()} />
    </View>
  );
}

function meusctt({ navigation }) {
  const [contatos, setContatos] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:3000/contatos')
      .then((response) => {
        setContatos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar contatos:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('DetalhesContato', { contato: item })}>
      <Avatar rounded source={{ uri: item.avatar }} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.numero}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
return (
    <View style={styles.container}>
      <FlatList data={contatos} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}


function Cadastrarctt({ navigation }) {
  {
    const [name, setName] = useState('');
    const [numero, setNumero] = useState('');
    
    const salvarContato = () => {
      axios.post('http://localhost:3000/contatos', {
        name, numero
      })
      .then(() => navigation.navigate('telalogin'))
      .catch((err) => console.log(err));
    };
  
    return (
      <View style={styles.container}>
        <Text h3 style={styles.title}>Usuário</Text>
        <Input placeholder='Nome' leftIcon={{ type: 'material', name: 'person' }} value={name} onChangeText={setName} />
        <Input placeholder='Numero' leftIcon={{ type: 'material', name: 'badge' }} value={numero} onChangeText={setNumero} />
        <Button title="Salvar" buttonStyle={styles.button} onPress={salvarContato} />
      </View>
    );}
}

function EditarContato({ navigation, route }) {
  const { contato } = route.params;
  const [name, setName] = useState(contato.name);
  const [numero, setNumero] = useState(contato.numero);

  const atualizarContato = () => {
    axios.put(`http://localhost:3000/contatos/${contato.id}`, {
      ...contato,
      name,
      numero
    })
    .then(() => navigation.navigate('meusctt'))
    .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Editar Contato</Text>
      <Input placeholder='Nome' value={name} onChangeText={setName} />
      <Input placeholder='Número' value={numero} onChangeText={setNumero} />
      <Button title="Salvar Alterações" buttonStyle={styles.button} onPress={atualizarContato} />
    </View>
  );
}





export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="telalogin">
        <Stack.Screen name="telalogin" component={telalogin} options={{ headerStyle: { backgroundColor: '#6a11cb' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
        <Stack.Screen name="Cadastrar" component={Cadastrar} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="EditarContato" component={EditarContato} options={{ title: 'editar aqui' }} />
        <Stack.Screen name="meusctt" component={meusctt} options={{ title: 'Lista de Contatos' }} />
        <Stack.Screen name="Cadastrarctt" component={Cadastrarctt} options={{ title: 'Cadastrar Contato' }} />
        <Stack.Screen name="DetalhesContato" component={DetalhesContato} options={{ title: 'Detalhes do Contato' }} />
        <Stack.Screen name="ListaCon" component={ListaCon} options={({ navigation }) => ({
          title: 'Meus Contatos',
          headerRight: () => (
            <Button
              icon={{ name: 'add', type: 'material', size: 24, color: 'blue' }}
              buttonStyle={{ backgroundColor: 'transparent', marginRight: 10 }}
              onPress={() => navigation.navigate('Cadastrarctt')}
            />
          ),
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 25,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  avatar: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
    alignSelf: 'center',
  },
  title: {
    marginBottom: 30,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    height: 50,
  },
  inputText: {
    color: '#fff',
  },
  buttonGroup: {
    width: '100%',
    marginTop: 15,
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 12,
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  buttonTitle: {
    color: '#6a11cb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#6a11cb',
    borderRadius: 10,
    marginTop: 10,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailSubtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});