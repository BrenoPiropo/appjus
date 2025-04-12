import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';


interface Props {
  navigation: any;
  route: any;
}

const PerguntaUsuario = ({ navigation, route }: Props) => {
  const [pergunta, setPergunta] = useState('');
  const [origem, setOrigem] = useState('');
  const [endereco, setEndereco] = useState('');
  const nome = route.params?.nome || 'Usuário';

  const handleEnviar = () => {
    if (!pergunta.trim() || !origem || !endereco.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de enviar');
      return;
    }
  
    const id = uuid.v4(); // Gera ID único
  
    const novaPergunta = {
      id,
      pergunta,
      nome,
      origem,
      endereco,
      resposta: null,
      mensagens: [
        { tipo: 'pergunta', texto: pergunta },
        { tipo: 'resposta', texto: 'Aguardando resposta do advogado...' },
      ]
    };
  
    navigation.navigate('RespostaUsuario', novaPergunta);
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Logo */}
        <Image source={require('../../assets/images/jus.jpg')} style={styles.image} />

        <Text style={styles.title}>Olá, {nome}</Text>
        <Text style={styles.subtitle}>Preencha o formulário abaixo:</Text>

        {/* Origem */}
        <Text style={styles.label}>Você é da:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={origem}
            onValueChange={(value) => setOrigem(value)}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="UESC" value="uesc" />
            <Picker.Item label="Comunidade Externa" value="externa" />
          </Picker>
        </View>

        {/* Endereço */}
        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu endereço completo"
          value={endereco}
          onChangeText={setEndereco}
        />

        {/* Pergunta */}
        <Text style={styles.label}>Pergunta jurídica:</Text>
        <TextInput
          style={[styles.input, styles.perguntaInput]}
          placeholder="Digite sua pergunta aqui"
          multiline
          numberOfLines={4}
          value={pergunta}
          onChangeText={setPergunta}
        />

        {/* Botão Enviar */}
        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar pergunta</Text>
        </TouchableOpacity>

        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.navigate('categories', { nome })}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#03045E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
    color: '#495057',
    alignSelf: 'flex-start',
  },
  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
  },
  perguntaInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  backbutton: {
    backgroundColor: '#ec1c1c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PerguntaUsuario;
