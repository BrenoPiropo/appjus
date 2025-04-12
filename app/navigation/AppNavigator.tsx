import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../src/screen/Login';
import Categories from '../../src/screen/Categories';
import PerguntaUsuario from '../../src/screen/PerguntaUsuario';
import RespostaUsuario from '../../src/screen/RespostaUsuario';
import HistoricoPerguntas from '../../src/screen/HistoricoPerguntas';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="categories" component={Categories} />
      <Stack.Screen name="PerguntaUsuario" component={PerguntaUsuario} />
      <Stack.Screen name="RespostaUsuario" component={RespostaUsuario} />
      <Stack.Screen name="HistoricoPerguntas" component={HistoricoPerguntas} />
      </Stack.Navigator>
  );
}
