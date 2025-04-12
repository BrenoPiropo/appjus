import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, Image, KeyboardAvoidingView, Platform
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Cadastro = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (nome === '' || senha === '' || confirmarSenha === '') {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    // Aqui você poderia salvar no AsyncStorage ou banco depois
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image source={require('../../assets/images/jus.jpg')} style={styles.logo} />
      <Text style={styles.title}>Consultas Jurídicas</Text>
      <Text style={styles.subtitle}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.voltarText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#03045E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#6C757D',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#212529',
  },
  button: {
    backgroundColor: '#007BFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  voltarText: {
    marginTop: 15,
    color: '#007BFF',
    fontSize: 14,
  },
});

export default Cadastro;
