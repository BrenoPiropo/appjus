import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image
} from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

const HistoricoPerguntas = ({ navigation, route }: Props) => {
  const { perguntas, nome } = route.params;

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('RespostaUsuario', {
          pergunta: item.pergunta,
          resposta: item.resposta,
          nome,
        })
      }
    >
      <Text style={styles.cardTitle}>Pergunta #{item.id}</Text>
      <Text style={styles.cardText} numberOfLines={2}>
        {item.pergunta}
      </Text>
      <Text style={styles.cardSubText}>
        Resposta: {item.resposta ? 'Disponível' : 'Aguardando'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/jus.jpg')} style={styles.image} />
      <Text style={styles.title}>Histórico de Perguntas</Text>

      <FlatList
        data={perguntas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('categories', { nome })}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#03045E',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 5,
  },
  cardSubText: {
    fontSize: 13,
    color: '#6C757D',
  },
  backButton: {
    backgroundColor: '#ec1c1c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default HistoricoPerguntas;
