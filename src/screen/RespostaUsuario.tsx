import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, Image
} from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

const RespostaUsuario = ({ navigation, route }: Props) => {
  const { nome, pergunta, resposta } = route.params;

  const [comentario, setComentario] = useState('');
  const [mensagens, setMensagens] = useState([
    { tipo: 'pergunta', texto: pergunta },
    { tipo: 'resposta', texto: resposta || 'Aguardando resposta do advogado...' },
  ]);

  const handleComentar = () => {
    if (!comentario.trim()) {
      Alert.alert('Atenção', 'Digite seu comentário antes de enviar.');
      return;
    }

    const novaMensagem = { tipo: 'comentario', texto: comentario };
    setMensagens(prev => [...prev, novaMensagem]);
    setComentario('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Image source={require('../../assets/images/jus.jpg')} style={styles.image} />
          <Text style={styles.title}>Chat com o Advogado</Text>
          <Text style={styles.subtitle}>Você pode acompanhar suas respostas aqui</Text>

          {/* Área do "chat" com rolagem separada */}
          <View style={styles.chatWrapper}>
            <ScrollView style={styles.chatScroll}>
              {mensagens.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.chatBubble,
                    msg.tipo === 'pergunta'
                      ? styles.userBubble
                      : msg.tipo === 'resposta'
                      ? styles.advBubble
                      : styles.comentarioBubble,
                  ]}
                >
                  <Text style={styles.chatText}>{msg.texto}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Campo para comentar */}
          <Text style={styles.commentLabel}>Enviar novo comentário:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Digite seu comentário"
            multiline
            numberOfLines={4}
            value={comentario}
            onChangeText={setComentario}
          />

          <TouchableOpacity style={styles.commentButton} onPress={handleComentar}>
            <Text style={styles.commentButtonText}>Enviar Comentário</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('categories', { nome })}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  inner: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
    marginBottom: 15,
    textAlign: 'center',
  },
  chatWrapper: {
    width: '100%',
    maxHeight: 300,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  chatScroll: {
    padding: 10,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '85%',
  },
  chatText: {
    fontSize: 15,
    color: '#333',
  },
  userBubble: {
    backgroundColor: '#D0EBFF',
    alignSelf: 'flex-start',
  },
  advBubble: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-end',
  },
  comentarioBubble: {
    backgroundColor: '#FFF3CD',
    alignSelf: 'flex-start',
  },
  commentLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#495057',
  },
  commentInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  commentButton: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  commentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  space: {
    height: 15,
  },
  backButton: {
    backgroundColor: '#ec1c1c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default RespostaUsuario;
