import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, KeyboardAvoidingView,
  Platform, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: any;
  route?: {
    params?: {
      usuarioNome?: string;
      pergunta?: string;
    };
  };
}

interface Mensagem {
  id: string;
  tipo: 'pergunta' | 'resposta' | 'comentario';
  texto: string;
  timestamp: string;
}

const ResponderUsuario = ({ navigation, route }: Props) => {
  // Valores padrão caso os parâmetros não sejam fornecidos
  const usuarioNome = route?.params?.usuarioNome || 'Usuário';
  const perguntaUsuario = route?.params?.pergunta || 'Pergunta não especificada';
  
  // Dados mockados - será substituído pelo Firebase posteriormente
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: '1',
      tipo: 'pergunta',
      texto: perguntaUsuario,
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      tipo: 'resposta',
      texto: 'Aguardando sua resposta...',
      timestamp: '10:35 AM'
    }
  ]);
  
  const [novaResposta, setNovaResposta] = useState('');

  const handleEnviarResposta = () => {
    if (!novaResposta.trim()) {
      Alert.alert('Atenção', 'Digite uma resposta antes de enviar');
      return;
    }

    const novaMsg: Mensagem = {
      id: Date.now().toString(),
      tipo: 'resposta',
      texto: novaResposta,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensagens([...mensagens, novaMsg]);
    setNovaResposta('');
    Alert.alert('Sucesso', 'Resposta enviada com sucesso!');
  };

  const handleFinalizarChat = () => {
    Alert.alert(
      'Finalizar Chat',
      'Deseja realmente finalizar esta conversa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Finalizar', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Image source={require('../../../assets/images/jus.jpg')} style={styles.image} />
          <Text style={styles.title}>Chat com {usuarioNome}</Text>
          <Text style={styles.subtitle}>Responda à pergunta do usuário</Text>

          {/* Área do chat */}
          <View style={styles.chatWrapper}>
            <ScrollView style={styles.chatScroll}>
              {mensagens.map((msg) => (
                <View
                  key={msg.id}
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
                  <Text style={styles.chatTime}>{msg.timestamp}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Campo para resposta */}
          <Text style={styles.commentLabel}>Digite sua resposta:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Escreva sua resposta aqui..."
            multiline
            numberOfLines={4}
            value={novaResposta}
            onChangeText={setNovaResposta}
          />

          <TouchableOpacity style={styles.commentButton} onPress={handleEnviarResposta}>
            <Ionicons name="send" size={20} color="#FFF" />
            <Text style={styles.commentButtonText}> Enviar Resposta</Text>
          </TouchableOpacity>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.actionButton, styles.finishButton]}
              onPress={handleFinalizarChat}
            >
              <Ionicons name="checkmark-done" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}> Finalizar Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.backButton]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}> Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

// Mantenha os estilos exatamente como estão no código anterior
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
    paddingBottom: 30,
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
    marginBottom: 5,
  },
  chatTime: {
    fontSize: 11,
    color: '#6C757D',
    alignSelf: 'flex-end',
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
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  commentButton: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  commentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  finishButton: {
    backgroundColor: '#17A2B8',
  },
  backButton: {
    backgroundColor: '#6C757D',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResponderUsuario;