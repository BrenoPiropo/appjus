import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import Card from '../../components/Card';

const analytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalPerguntas: 0,
    perguntasSemana: 0,
    perguntasHoje: 0,
    origem: {
      uesc: 0,
      comunidade: 0
    },
    cidades: []
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsuarios: 142,
        totalPerguntas: 89,
        perguntasSemana: 12,
        perguntasHoje: 3,
        origem: {
          uesc: 67,
          comunidade: 22
        },
        cidades: [
          { nome: 'Ilhéus', quantidade: 45 },
          { nome: 'Itabuna', quantidade: 28 },
          { nome: 'Salvador', quantidade: 8 },
          { nome: 'Uruçuca', quantidade: 5 },
          { nome: 'Camacã', quantidade: 4 },
          { nome: 'Coaraci', quantidade: 3 },
          { nome: 'Buerarema', quantidade: 3 },
          { nome: 'São José', quantidade: 2 },
          { nome: 'Barra do Rocha', quantidade: 2 },
          { nome: 'Outras', quantidade: 8 }
        ]
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando estatísticas...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Estatísticas do Sistema</Text>

      {/* Cards com métricas principais */}
      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Ionicons name="people" size={30} color="#007BFF" />
          <Text style={styles.metricValue}>{stats.totalUsuarios}</Text>
          <Text style={styles.metricLabel}>Usuários cadastrados</Text>
        </Card>

        <Card style={styles.metricCard}>
          <Ionicons name="chatbubbles" size={30} color="#28A745" />
          <Text style={styles.metricValue}>{stats.totalPerguntas}</Text>
          <Text style={styles.metricLabel}>Perguntas totais</Text>
        </Card>
      </View>

      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Ionicons name="calendar" size={30} color="#FFC107" />
          <Text style={styles.metricValue}>{stats.perguntasSemana}</Text>
          <Text style={styles.metricLabel}>Última semana</Text>
        </Card>

        <Card style={styles.metricCard}>
          <Ionicons name="today" size={30} color="#DC3545" />
          <Text style={styles.metricValue}>{stats.perguntasHoje}</Text>
          <Text style={styles.metricLabel}>Hoje</Text>
        </Card>
      </View>

    {/* Gráfico de Origem dos Usuários */}
<Card style={styles.chartCard}>
  <Text style={styles.chartTitle}>Origem dos Usuários</Text>
  <PieChart
    data={[
      {
        name: 'UESC',
        population: stats.origem.uesc,
        color: '#007BFF',
        legendFontColor: '#495057',
        legendFontSize: 14
      },
      {
        name: 'Com. externa', // Texto abreviado
        population: stats.origem.comunidade,
        color: '#28A745',
        legendFontColor: '#495057',
        legendFontSize: 14
      }
    ]}
    width={Dimensions.get('window').width - 40}
    height={220} // Aumentei um pouco a altura para acomodar a quebra de linha
    chartConfig={{
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    accessor="population"
    backgroundColor="transparent"
    paddingLeft="15"
    absolute
  />
</Card>
      {/* Tabela de Cidades com ScrollView */}
      <Card style={styles.tableCard}>
        <Text style={styles.chartTitle}>Distribuição por Cidade</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>Cidade</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Perguntas</Text>
        </View>
        <ScrollView style={styles.tableScrollView}>
          {stats.cidades.map((cidade, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                index % 2 === 0 && { backgroundColor: '#F8F9FA' }
              ]}
            >
              <Text style={[styles.tableCell, { flex: 2 }]}>{cidade.nome}</Text>
              <Text style={styles.tableCell}>{cidade.quantidade}</Text>
            </View>
          ))}
        </ScrollView>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6C757D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03045E',
    marginBottom: 20,
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricCard: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginVertical: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  chartCard: {
    marginBottom: 20,
    padding: 15,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableCard: {
    padding: 15,
  },
  tableScrollView: {
    maxHeight: 200, // Altura fixa para a lista de cidades
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#212529',
  },
  headerCell: {
    fontWeight: '600',
    color: '#495057',
  },
});

export default analytics;