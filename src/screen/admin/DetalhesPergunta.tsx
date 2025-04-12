import React from 'react';
import {
  View, Text, ScrollView, 
  StyleSheet, Image, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Mensagem {
  id: string;
  tipo: 'pergunta' | 'resposta' | 'comentario';
  texto: string;
  data: string;
  autor: string;
}

interface Props {
  navigation: any;
  route: {
    params: {
      perguntaId: string;
      usuarioNome: string;
      pergunta: string;
      dataPergunta: string;
      dataResposta: string;
    };
  };
}

const DetalhesPergunta = ({ navigation, route }: Props) => {
  const { usuarioNome, pergunta, dataPergunta, dataResposta } = route.params;

  // Dados mockados do chat - substituir por chamada ao Firebase posteriormente
  const mensagens: Mensagem[] = [
    {
      id: '1',
      tipo: 'pergunta',
      texto: pergunta,
      data: dataPergunta,
      autor: usuarioNome
    },
    {
      id: '2',
      tipo: 'resposta',
      texto: 'Para abrir um MEI, você precisa acessar o portal do empreendedor e seguir os passos indicados. É necessário ter CPF válido e não ter pendências com a Receita Federal.',
      data: dataResposta,
      autor: 'Advogado'
    },
    {
      id: '3',
      tipo: 'comentario',
      texto: 'Obrigado pela resposta! Já iniciei o processo.',
      data: '15/05/2023 - 10:45',
      autor: usuarioNome
    }
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/images/jus.jpg')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Detalhes da Pergunta</Text>
        <Text style={styles.subtitle}>Conversa com {usuarioNome}</Text>
      </View>

      {/* Área de status */}
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Pergunta em:</Text>
          <Text style={styles.statusValue}>{dataPergunta}</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Respondida em:</Text>
          <Text style={styles.statusValue}>{dataResposta}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
          <Ionicons name="checkmark-done" size={18} color="#28A745" />
          <Text style={[styles.statusText, { color: '#28A745' }]}>Finalizada</Text>
        </View>
      </View>

      {/* Histórico do Chat */}
      <ScrollView style={styles.chatContainer}>
        {mensagens.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble,
              msg.tipo === 'pergunta' ? styles.userBubble : 
              msg.tipo === 'resposta' ? styles.adminBubble : 
              styles.commentBubble
            ]}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.messageAuthor}>
                {msg.tipo === 'resposta' ? 'Advogado' : usuarioNome}
              </Text>
              <Text style={styles.messageTime}>{msg.data}</Text>
            </View>
            <Text style={styles.messageText}>{msg.texto}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 3,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 30,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    maxWidth: '85%',
  },
  userBubble: {
    backgroundColor: '#D0EBFF',
    alignSelf: 'flex-start',
  },
  adminBubble: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-end',
  },
  commentBubble: {
    backgroundColor: '#FFF3CD',
    alignSelf: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  messageTime: {
    fontSize: 12,
    color: '#6C757D',
  },
  messageText: {
    fontSize: 15,
    color: '#212529',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default DetalhesPergunta;