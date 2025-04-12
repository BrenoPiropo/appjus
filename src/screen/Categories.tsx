import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, BackHandler
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: any;
  route: RouteProp<{ params: { nome: string } }, 'params'>;
}

const Categories: React.FC<Props> = ({ navigation, route }) => {
  const { nome } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/jus.jpg')} style={styles.image} />
      <Text style={styles.title}>Bem-vindo, {nome}!</Text>
      <Text style={styles.subtitle}>Escolha uma opção:</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('PerguntaUsuario', { nome })}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={60} color="#007BFF" />
          <Text style={styles.optionText}>Fazer Pergunta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() =>
            navigation.navigate('HistoricoPerguntas', {
              nome,
              perguntas: [
                {
                  id: 1,
                  pergunta: 'Como faço para abrir um MEI?',
                  resposta: 'Você deve acessar o portal do empreendedor e seguir os passos...',
                },
                {
                  id: 2,
                  pergunta: 'Posso ser demitido sem justa causa?',
                  resposta: null,
                },
              ]
            })
          }
        >
          <Ionicons name="eye-outline" size={60} color="#28A745" />
          <Text style={styles.optionText}>Historico de perguntas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });

          // Se quiser também sair do app, descomente a linha abaixo:
          // BackHandler.exitApp();
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="#FFF" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03045E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: width * 0.9,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '47%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default Categories;
