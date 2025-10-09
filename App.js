import { View, Text, StyleSheet, TextInput, Pressable, Keyboard, KeyboardAvoidingView, StatusBar, Alert,} from 'react-native'; 
import { useState, useRef } from 'react';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const alturaRef = useRef(null);

  function calcular() {
    Keyboard.dismiss();

    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));

    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      Alert.alert('Erro', 'Digite um peso e uma altura válidos!');
      setImc(null);
      setClassificacao('');
      return;
    }

    const resultado = p / (a * a);
    setImc(resultado);

    if (resultado < 18.5) setClassificacao('Abaixo do peso');
    else if (resultado <= 24.9) setClassificacao('Peso normal');
    else if (resultado <= 29.9) setClassificacao('Sobrepeso');
    else if (resultado <= 34.9) setClassificacao('Obesidade Grau I');
    else if (resultado <= 39.9) setClassificacao('Obesidade Grau II');
    else setClassificacao('Obesidade Grau III');
  }

  function limpar() {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView style={styles.app} behavior="padding">
      <StatusBar barStyle="dark-content" backgroundColor="#e4ebf0" />
      <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Calcule seu IMC</Text>
          <Text style={styles.subtitulo}>
            Preencha os campos abaixo para descobrir seu Índice de Massa Corporal.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Peso (ex: 70.5)"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
            returnKeyType="next"
            onSubmitEditing={() => alturaRef.current.focus()}
            placeholderTextColor="#adb5bd"
          />

          <TextInput
            style={styles.input}
            placeholder="Altura (ex: 1.75)"
            keyboardType="numeric"
            value={altura}
            onChangeText={setAltura}
            ref={alturaRef}
            returnKeyType="done"
            onSubmitEditing={calcular}
            placeholderTextColor="#adb5bd"
          />

          <Pressable
            style={({ pressed }) => [styles.botao, pressed && { opacity: 0.8 }]}
            onPress={calcular}
          >
            <Text style={styles.botaoTexto}>Calcular</Text>
          </Pressable>

          {imc !== null && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoValor}>{imc.toFixed(2)}</Text>
              <Text style={styles.resultadoclassificacao}>{classificacao}</Text>

              <Pressable
                style={({ pressed }) => [styles.botaoLimpar, pressed && { opacity: 0.8 }]}
                onPress={limpar}
              >
                <Text style={styles.botaoLimparTexto}>Limpar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#e4ebf0',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    elevation: 5,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4180ab',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f8f9fa',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ced4da',
    borderWidth: 1,
    color: '#6c757d',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#4180ab',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultadoContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 5,
  },
  resultadoValor: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4180ab',
  },
  resultadoclassificacao: {
    fontSize: 18,
    color: '#343a40',
    fontWeight: '500',
  },
  botaoLimpar: {
    backgroundColor: '#d3544a',
    width: '100%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  botaoLimparTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});