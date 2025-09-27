import { View, Text, StyleSheet, TextInput, Pressable, Keyboard, TouchableWithoutFeedback, Alert, StatusBar } from 'react-native';
import { useState, useRef } from 'react';

export default function App() {
  const [peso, setpeso] = useState('');
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

    const imc = p / (a * a);
    setImc(imc);

    if (imc < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imc <= 24.9) {
      setClassificacao('peso normal');
    } else if (imc <= 29.9) {
      setClassificacao('Sobrepeso');
    } else if (imc <= 34.9) {
      setClassificacao('Obesidade Grau I');
    } else if (imc <= 39.9) {
      setClassificacao('Obesidade Grau II');
    } else {
      setClassificacao('Obesidade Grau III');
    }
  }

  function limpar() {
    setpeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor="#e4ebf0" />
        <View style={styles.card}>
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Calcule seu IMC</Text>
          </View>

          <Text style={styles.subtitulo}>
            Preencha os campos abaixo para descobrir seu Índice de Massa Corporal.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="peso (ex: 70.5)"
              keyboardType="numeric"
              value={peso}
              onChangeText={setpeso}
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
          </View>

          <Pressable
            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
            onPress={calcular}>
            <Text style={styles.botaoTexto}>Calcular</Text>
          </Pressable>

          {imc !== null && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoValor}>{imc.toFixed(2)}</Text>
              <Text style={styles.resultadoclassificacao}>{classificacao}</Text>
              <Pressable
                style={({ pressed }) => [styles.botaoLimpar, pressed && styles.botaoLimparPressionado]}
                onPress={limpar}>
                <Text style={styles.botaoLimparTexto}>Limpar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#e4ebf0',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  tituloContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#4180ab',
    paddingBottom: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4180ab',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 25,
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
  },
  botao: {
    backgroundColor: '#4180ab',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4178be',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  botaoPressionado: {
    backgroundColor: '#4a8abc',
    opacity: 0.9,
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
  botaoLimparPressionado: {
    backgroundColor: '#e67c73',
    opacity: 0.9,
  },
  botaoLimparTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
