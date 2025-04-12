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

const CategoriesAdmin: React.FC<Props> = ({ navigation, route }) => {
  const { nome } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/jus.jpg')} style={styles.image} />
      <Text style={styles.title}>Bem-vindo,{nome}!</Text>
      <Text style={styles.subtitle}>Painel de Administração</Text>

      <View style={styles.optionsContainer}>
        {/* Perguntas não respondidas */}
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#FFF3CD' }]}
          onPress={() => navigation.navigate('ListarPerguntas')}
        >
          <Ionicons name="time-outline" size={60} color="#FFC107" />
          <Text style={styles.optionText}>Perguntas não respondidas</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>4</Text>
          </View>
        </TouchableOpacity>

        {/* Perguntas respondidas */}
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#D4EDDA' }]}
          onPress={() => navigation.navigate('PerguntasRespondidas')}
        >
          <Ionicons name="checkmark-done-outline" size={60} color="#28A745" />
          <Text style={styles.optionText}>Perguntas respondidas</Text>
        </TouchableOpacity>

        {/* Analytics */}
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#D1ECF1' }]}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Ionicons name="analytics-outline" size={60} color="#17A2B8" />
          <Text style={styles.optionText}>Estatísticas</Text>
        </TouchableOpacity>

        {/* Gerenciar Usuários */}
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#F8D7DA' }]}
          onPress={() => navigation.navigate('PerguntasPendentes')}
        >
          <Ionicons name="people-outline" size={60} color="#DC3545" />
          <Text style={styles.optionText}>Perguntas pendentes</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar à tela normal de usuário (opcional) */}
      <TouchableOpacity
        style={[styles.switchButton, { backgroundColor: '#6C757D' }]}
        onPress={() => navigation.navigate('categories', { nome })}
      >
        <Ionicons name="person-outline" size={20} color="#FFF" />
        <Text style={styles.switchButtonText}>Modo Usuário</Text>
      </TouchableOpacity>

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
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
    paddingTop: 40,
    paddingHorizontal: 20,
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
    marginBottom: 30,
    fontWeight: '600',
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
    position: 'relative',
  },
  optionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#DC3545',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
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
  switchButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
  },
  switchButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default CategoriesAdmin;