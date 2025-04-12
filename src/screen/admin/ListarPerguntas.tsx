import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, 
  StyleSheet, ScrollView, ActivityIndicator,
  Image, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Pergunta {
  id: string;
  usuarioNome: string;
  pergunta: string;
  data: string;
  status: 'pendente' | 'respondida' | 'finalizada';
}

const ListarPerguntas = ({ navigation }: { navigation: any }) => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulação de dados - substituir por chamada ao Firebase posteriormente
  useEffect(() => {
    const timer = setTimeout(() => {
      setPerguntas([
        {
          id: '1',
          usuarioNome: 'João Silva',
          pergunta: 'Como faço para abrir um MEI?',
          data: '10/05/2023 - 10:30',
          status: 'pendente'
        },
        {
          id: '2',
          usuarioNome: 'Maria Souza',
          pergunta: 'Posso ser demitido sem justa causa?',
          data: '11/05/2023 - 14:15',
          status: 'pendente'
        },
        {
          id: '3',
          usuarioNome: 'Carlos Oliveira',
          pergunta: 'Quais documentos preciso para abrir uma empresa?',
          data: '12/05/2023 - 09:45',
          status: 'pendente'
        },
        {
          id: '4',
          usuarioNome: 'Ana Santos',
          pergunta: 'Como funciona o direito de arrependimento em compras online?',
          data: '13/05/2023 - 16:20',
          status: 'pendente'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ item }: { item: Pergunta }) => (
    <TouchableOpacity 
      style={[
        styles.perguntaCard,
        item.status === 'pendente' && styles.pendenteCard,
      ]}
      onPress={() => navigation.navigate('ResponderUsuario', { 
        perguntaId: item.id,
        usuarioNome: item.usuarioNome,
        pergunta: item.pergunta 
      })}
    >
      <View style={styles.perguntaHeader}>
        <Ionicons 
          name="person-circle-outline" 
          size={24} 
          color={
            item.status === 'pendente' ? '#FFC107' : 
            item.status === 'respondida' ? '#28A745' : '#6C757D'
          } 
        />
        <Text style={styles.usuarioNome}>{item.usuarioNome}</Text>
        <Text style={styles.perguntaData}>{item.data}</Text>
      </View>
      
      <Text style={styles.perguntaTexto} numberOfLines={2}>
        {item.pergunta}
      </Text>
      
      <View style={styles.perguntaFooter}>
        <View style={[
          styles.statusBadge,
          item.status === 'pendente' && styles.pendenteBadge,
          item.status === 'respondida' && styles.respondidaBadge,
          item.status === 'finalizada' && styles.finalizadaBadge,
        ]}>
          <Text style={styles.statusText}>
            {item.status === 'pendente' ? 'Pendente' : 
             item.status === 'respondida' ? 'Respondida' : 'Finalizada'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6C757D" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/images/jus.jpg')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Perguntas dos Usuários</Text>
        <Text style={styles.subtitle}>Total: {perguntas.length} perguntas</Text>
      </View>

      {/* Lista de Perguntas */}
      <FlatList
        data={perguntas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={50} color="#CED4DA" />
            <Text style={styles.emptyText}>Nenhuma pergunta encontrada</Text>
          </View>
        }
      />

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
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  perguntaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendenteCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  respondidaCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  finalizadaCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6C757D',
  },
  perguntaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  usuarioNome: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
    color: '#495057',
  },
  perguntaData: {
    fontSize: 12,
    color: '#6C757D',
  },
  perguntaTexto: {
    fontSize: 15,
    color: '#212529',
    marginBottom: 12,
    lineHeight: 22,
  },
  perguntaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  pendenteBadge: {
    backgroundColor: '#FFF3CD',
  },
  respondidaBadge: {
    backgroundColor: '#D4EDDA',
  },
  finalizadaBadge: {
    backgroundColor: '#F8F9FA',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6C757D',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 10,
    color: '#6C757D',
    fontSize: 16,
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

export default ListarPerguntas;