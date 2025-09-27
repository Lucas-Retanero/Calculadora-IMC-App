import {View, Text, StyleSheet, TextInput, Pressable, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView,} from 'react-native';
import { useState, useRef } from 'react';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const alturaInputRef = useRef(null);

  function calcularIMC() {
    Keyboard.dismiss();

    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));

    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      Alert.alert('Erro', 'Por favor, digite um peso e uma altura válidos!');
      setResultado(null);
      setClassificacao('');
      return;
    }

    const imc = p / (a * a);
    setResultado(imc);

    if (imc < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imc <= 24.9) {
      setClassificacao('Peso normal');
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

  function limparCampos() {
    setPeso('');
    setAltura('');
    setResultado(null);
    setClassificacao('');
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/*Isso serve para quando clicar fora, fechar o teclado no celular. Mas se for no web, não funciona e precisa tirar o TouchableWithoutFeedback*/}
      <KeyboardAvoidingView style={styles.app} behavior='padding'>
        <View style={styles.card}>
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Calcule seu IMC</Text>
          </View>

          <Text style={styles.subtitulo}>
            Preencha os campos abaixo para descobrir seu Índice de Massa
            Corporal.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Peso (ex: 70.5)"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
              returnKeyType="next" 
              onSubmitEditing={() => alturaInputRef.current.focus()}
              placeholderTextColor="#adb5bd"
            />
            <TextInput
              style={styles.input}
              placeholder="Altura (ex: 1.75)"
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
              ref={alturaInputRef}
              returnKeyType="done" 
              onSubmitEditing={calcularIMC} 
              placeholderTextColor="#adb5bd"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={calcularIMC}>
            <Text style={styles.buttonText}>Calcular</Text>
          </Pressable>

          {resultado !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultValue}>{resultado.toFixed(2)}</Text>
              <Text style={styles.resultClassification}>{classificacao}</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed && styles.clearButtonPressed,
                ]}
                onPress={limparCampos}>
                <Text style={styles.clearButtonText}>Limpar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: '#ffffff',
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

  button: {
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

  buttonPressed: {
    backgroundColor: '#4a8abc',
    opacity: 0.9,
  },

  clearButton: {
    backgroundColor: '#d3544a',
    width: '100%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  clearButtonPressed: {
    backgroundColor: '#e67c73',
    opacity: 0.9,
  },

  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 5,
  },

  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4180ab',
  },

  resultClassification: {
    fontSize: 18,
    color: '#343a40',
    fontWeight: '500',
  },

  clearButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
