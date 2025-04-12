import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../src/screen/Login';
import Categories from '../../src/screen/Categories';
import PerguntaUsuario from '../../src/screen/PerguntaUsuario';
import RespostaUsuario from '../../src/screen/RespostaUsuario';
import HistoricoPerguntas from '../../src/screen/HistoricoPerguntas';
import Cadastro from '../../src/screen/Cadastro';
import CategoriesAdmin from '../../src/screen/admin/CategoriesAdmin';
import ResponderUsuario from '../../src/screen/admin/ResponderUsuario';
import ListarPerguntas from '../../src/screen/admin/ListarPerguntas';
import PerguntasRespondidas from '../../src/screen/admin/PerguntasRespondidas';
import DetalhesPergunta from '../../src/screen/admin/DetalhesPergunta';
import PerguntasPendentes from '../../src/screen/admin/PerguntasPendentes';
import Analytics from '../../src/screen/admin/analytics';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="categories" component={Categories} />
      <Stack.Screen name="PerguntaUsuario" component={PerguntaUsuario} />
      <Stack.Screen name="RespostaUsuario" component={RespostaUsuario} />
      <Stack.Screen name="HistoricoPerguntas" component={HistoricoPerguntas} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="CategoriesAdmin" component={CategoriesAdmin} />
      <Stack.Screen name="ResponderUsuario" component={ResponderUsuario} />
      <Stack.Screen name="ListarPerguntas" component={ListarPerguntas} />
      <Stack.Screen name="PerguntasRespondidas" component={PerguntasRespondidas} />
      <Stack.Screen name="PerguntasPendentes" component={PerguntasPendentes} />
      <Stack.Screen name="DetalhesPergunta" component={DetalhesPergunta} />
      <Stack.Screen name="Analytics" component={Analytics} />
      </Stack.Navigator>
  );
}
