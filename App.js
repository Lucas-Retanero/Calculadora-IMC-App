import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, 
  StatusBar, Alert, ScrollView, TouchableOpacity, Platform 
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function App() {
  // Estados do Perfil
  const [perfil, setPerfil] = useState('adulto');
  const [genero, setGenero] = useState('homem');
  const [gravida, setGravida] = useState(false);

  // Estados dos Dados
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idadeAnos, setIdadeAnos] = useState('');
  const [idadeMeses, setIdadeMeses] = useState('');
  const [pesoPreGestacional, setPesoPreGestacional] = useState('');
  const [semanaGestacional, setSemanaGestacional] = useState('');

  // Estados de Resultado
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [pesoIdealMin, setPesoIdealMin] = useState(null);
  const [pesoIdealMax, setPesoIdealMax] = useState(null);

  const calcular = () => {
    Keyboard.dismiss();

    const p = parseFloat(String(peso).replace(',', '.'));
    const aCm = parseFloat(String(altura).replace(',', '.'));

    if (isNaN(p) || isNaN(aCm) || p <= 0 || aCm <= 0) {
      Alert.alert('Erro', 'Digite um peso e uma altura válidos!');
      return;
    }

    const aM = aCm / 100;
    const resultado = p / (aM * aM);
    setImc(resultado);

    setPesoIdealMin(18.5 * aM * aM);
    setPesoIdealMax(24.9 * aM * aM);

    if (perfil === 'idoso') {
      if (resultado < 22) setClassificacao('Abaixo do peso');
      else if (resultado <= 27) setClassificacao('Peso normal');
      else setClassificacao('Sobrepeso');
    } else {
      if (resultado < 18.5) setClassificacao('Magreza');
      else if (resultado <= 24.9) setClassificacao('Saudável');
      else if (resultado <= 29.9) setClassificacao('Sobrepeso');
      else if (resultado <= 34.9) setClassificacao('Obesidade Grau I');
      else if (resultado <= 39.9) setClassificacao('Obesidade Grau II');
      else setClassificacao('Obesidade Grau III');
    }
  };

  const limpar = () => {
    setPeso(''); setAltura(''); setIdadeAnos(''); setIdadeMeses('');
    setPesoPreGestacional(''); setSemanaGestacional('');
    setImc(null); setClassificacao(''); setGravida(false);
    setPesoIdealMin(null); setPesoIdealMax(null);
    Keyboard.dismiss();
  };

  const getMarkerPosition = () => {
    if (!imc) return '0%';
    const minIMC = 15; // Valor mínimo da barra
    const maxIMC = 40; // Valor máximo da barra
    const percentage = ((imc - minIMC) / (maxIMC - minIMC)) * 100;
    return `${Math.min(Math.max(percentage, 0), 100)}%`;
  };

  const handlePerfilChange = (novoPerfil) => {
    setPerfil(novoPerfil);
    if (novoPerfil === 'crianca' || novoPerfil === 'idoso') {
      setGravida(false);
    }
  };

  const handleGeneroChange = (novoGenero) => {
    setGenero(novoGenero);
    if (novoGenero === 'homem') {
      setGravida(false);
    }
  };

  const getMensagemMeta = () => {
    if (!imc || !pesoIdealMin || !pesoIdealMax) return null;
    const pesoAtualNum = parseFloat(String(peso).replace(',', '.'));
    
    if (pesoAtualNum > pesoIdealMax) {
      const dif = (pesoAtualNum - pesoIdealMax).toFixed(1).replace('.', ',');
      return { texto: `Perder aproximadamente ${dif} kg para atingir a faixa saudável.`, cor: '#e76f51', icon: 'trending-down', titulo: 'Meta: ' };
    } else if (pesoAtualNum < pesoIdealMin) {
      const dif = (pesoIdealMin - pesoAtualNum).toFixed(1).replace('.', ',');
      return { texto: `Ganhar aproximadamente ${dif} kg para atingir a faixa saudável.`, cor: '#fca503', icon: 'trending-up', titulo: 'Meta: ' };
    } else {
      return { texto: 'Seu peso está na faixa saudável.', cor: '#4180ab', icon: 'checkmark-done-circle', titulo: 'Parabéns! ' };
    }
  };

  const meta = getMensagemMeta();
  const pesoAtualCalculado = peso ? parseFloat(String(peso).replace(',', '.')) : 0;

  return (
    <KeyboardAvoidingView 
      style={styles.app} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} 
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f4f7f8" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>

          <MaterialCommunityIcons name="heart-pulse" size={36} color="#4180ab" />
          <Text style={styles.titulo}>Calculadora{'\n'}de IMC</Text>
        </View>
        <Text style={styles.subtitulo}>Calcule seu IMC com precisão para adultos, idosos, gestantes e crianças.</Text>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Perfil do Usuário:</Text>
          
          <TouchableOpacity 
            style={[styles.optionCard, perfil === 'adulto' && styles.optionCardActive]}
            onPress={() => handlePerfilChange('adulto')}
          >
            <MaterialCommunityIcons name="account" size={24} color={perfil === 'adulto' ? '#4180ab' : '#6c757d'} />
            <Text style={[styles.optionText, perfil === 'adulto' && styles.optionTextActive]}>Adulto</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionCard, perfil === 'idoso' && styles.optionCardActive]}
            onPress={() => handlePerfilChange('idoso')}
          >
            <MaterialCommunityIcons name="account-clock" size={24} color={perfil === 'idoso' ? '#4180ab' : '#6c757d'} />
            <Text style={[styles.optionText, perfil === 'idoso' && styles.optionTextActive]}>Idoso (60+)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionCard, perfil === 'crianca' && styles.optionCardActive]}
            onPress={() => handlePerfilChange('crianca')}
          >
            <FontAwesome5 name="child" size={20} color={perfil === 'crianca' ? '#4180ab' : '#6c757d'} />
            <Text style={[styles.optionText, perfil === 'crianca' && styles.optionTextActive]}>Criança (2-19)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.optionCardHalf, genero === 'homem' && styles.optionCardActive]}
            onPress={() => handleGeneroChange('homem')}
          >
            <MaterialCommunityIcons name="gender-male" size={24} color={genero === 'homem' ? '#4180ab' : '#6c757d'} />
            <Text style={[styles.optionText, genero === 'homem' && styles.optionTextActive]}>Homem</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionCardHalf, genero === 'mulher' && styles.optionCardActive]}
            onPress={() => handleGeneroChange('mulher')}
          >
            <MaterialCommunityIcons name="gender-female" size={24} color={genero === 'mulher' ? '#4180ab' : '#6c757d'} />
            <Text style={[styles.optionText, genero === 'mulher' && styles.optionTextActive]}>Mulher</Text>
          </TouchableOpacity>
        </View>

        {genero === 'mulher' && perfil === 'adulto' && (
          <TouchableOpacity 
            style={[styles.pregnantBox, gravida && styles.pregnantBoxActive]}
            onPress={() => setGravida(!gravida)}
          >
            <MaterialCommunityIcons name={gravida ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color="#c85a8b" />
            <MaterialCommunityIcons name="baby-carriage" size={24} color="#c85a8b" style={{ marginLeft: 10 }} />
            <Text style={styles.pregnantText}>Estou grávida</Text>
          </TouchableOpacity>
        )}

        {gravida && genero === 'mulher' && perfil === 'adulto' && (
          <View style={styles.pregnantExtraBox}>
            <Text style={styles.labelDark}>Peso Pré-Gestacional (kg)</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="weight" size={20} color="#6c757d" />
              <TextInput style={styles.inputIcon} placeholder="Peso antes da gravidez" keyboardType="numeric" value={pesoPreGestacional} onChangeText={setPesoPreGestacional} />
            </View>

            <Text style={styles.labelDark}>Semana Gestacional</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="calendar-month" size={20} color="#6c757d" />
              <TextInput style={styles.inputIcon} placeholder="Ex: 20" keyboardType="numeric" value={semanaGestacional} onChangeText={setSemanaGestacional} />
            </View>
          </View>
        )}

        {perfil === 'crianca' && (
          <View style={styles.childBox}>
            <Text style={styles.childTitle}>Idade da Criança</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome5 name="birthday-cake" size={18} color="#6c757d" />
              <TextInput style={styles.inputIcon} placeholder="Anos" keyboardType="numeric" value={idadeAnos} onChangeText={setIdadeAnos} />
            </View>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="calendar" size={20} color="#6c757d" />
              <TextInput style={styles.inputIcon} placeholder="Meses" keyboardType="numeric" value={idadeMeses} onChangeText={setIdadeMeses} />
            </View>
            <Text style={styles.childHelp}>Informe anos e meses (ex: 8 anos e 6 meses)</Text>
          </View>
        )}

        <View style={styles.mainInputs}>
          <Text style={styles.labelDark}>Peso Atual (kg)</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="weight" size={20} color="#6c757d" />
            <TextInput style={styles.inputIcon} placeholder="Ex: 70.5" keyboardType="numeric" value={peso} onChangeText={setPeso} />
          </View>

          <Text style={styles.labelDark}>Altura (cm)</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="human-male-height" size={20} color="#6c757d" />
            <TextInput style={styles.inputIcon} placeholder="Ex: 175" keyboardType="numeric" value={altura} onChangeText={setAltura} />
          </View>

          {perfil !== 'crianca' && (
            <>
              <Text style={styles.labelDark}>Idade (anos)</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account" size={20} color="#6c757d" />
                <TextInput style={styles.inputIcon} placeholder={`Ex: ${perfil === 'idoso' ? '65 (60+)' : '30'}`} keyboardType="numeric" value={idadeAnos} onChangeText={setIdadeAnos} />
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.btnCalcular} onPress={calcular}>
          <Text style={styles.btnCalcularText}>Calcular Meu IMC</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>

        {imc !== null && (
          <View style={styles.novoResultadoContainer}>
            <View style={styles.imcCircle}>
              <Text style={styles.imcCircleValue}>{imc.toFixed(1).replace('.', ',')}</Text>
              <Text style={styles.imcCircleLabel}>IMC</Text>
            </View>

            <Text style={styles.resultadoTituloPrincipal}>Seu resultado:</Text>
            <Text style={[styles.resultadoTituloPrincipal, { marginBottom: 15 }]}>{classificacao}</Text>
            <Text style={styles.resultadoSubtitulo}>Confira a análise detalhada abaixo.</Text>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressSegment, { backgroundColor: '#fca503', flex: 1 }]} /> 
              <View style={[styles.progressSegment, { backgroundColor: '#4180ab', flex: 1.5 }]} /> 
              <View style={[styles.progressSegment, { backgroundColor: '#f4a261', flex: 1.2 }]} /> 
              <View style={[styles.progressSegment, { backgroundColor: '#e76f51', flex: 1.8 }]} /> 
              <View style={[styles.progressMarker, { left: getMarkerPosition() }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabelText}>Magreza</Text>
              <Text style={styles.progressLabelText}>Normal</Text>
              <Text style={styles.progressLabelText}>Sobrepeso</Text>
              <Text style={styles.progressLabelText}>Obesidade</Text>
            </View>

            <View style={styles.pesoIdealCard}>
              <View style={styles.pesoIdealHeader}>
                <Ionicons name="radio-button-on" size={24} color="#4180ab" />
                <Text style={styles.pesoIdealTitle}>Seu Peso Ideal</Text>
              </View>

              <View style={styles.faixaSaudavelBox}>
                <Text style={styles.faixaSaudavelLabel}>Faixa Saudável:</Text>
                <Text style={styles.faixaSaudavelValue}>
                  {pesoIdealMin?.toFixed(1).replace('.', ',')} - {pesoIdealMax?.toFixed(1).replace('.', ',')} kg
                </Text>
              </View>

              <View style={styles.comparativoBox}>
                <Text style={styles.pesoAtualValue}>{pesoAtualCalculado.toFixed(1).replace('.', ',')} kg</Text>
                <Text style={styles.pesoAtualLabel}>atual</Text>
                
                {pesoAtualCalculado > pesoIdealMax ? (
                  <>
                    <MaterialCommunityIcons name="arrow-left-right" size={24} color="#6c757d" style={{ marginVertical: 5 }} />
                    <Text style={[styles.statusText, { color: '#e76f51', fontSize: 20 }]}>
                      +{(pesoAtualCalculado - pesoIdealMax).toFixed(1).replace('.', ',')} kg
                    </Text>
                    <Text style={styles.statusSubtext}>acima do máximo</Text>
                  </>
                ) : pesoAtualCalculado < pesoIdealMin ? (
                  <>
                    <MaterialCommunityIcons name="arrow-left-right" size={24} color="#6c757d" style={{ marginVertical: 5 }} />
                    <Text style={[styles.statusText, { color: '#fca503', fontSize: 20 }]}>
                      -{(pesoIdealMin - pesoAtualCalculado).toFixed(1).replace('.', ',')} kg
                    </Text>
                    <Text style={styles.statusSubtext}>abaixo do mínimo</Text>
                  </>
                ) : (
                  <>
                    <Feather name="arrow-down-circle" size={24} color="#6c757d" style={{ marginVertical: 5 }} />
                    <View style={styles.statusBox}>
                      {/* Cor alterada */}
                      <Feather name="check" size={20} color="#4180ab" />
                      <Text style={styles.statusText}>Ideal</Text>
                    </View>
                    <Text style={styles.statusSubtext}>dentro da faixa!</Text>
                  </>
                )}
              </View>

              {meta && (
                <View style={styles.mensagemBox}>
                  <Ionicons name={meta.icon} size={24} color={meta.cor} />
                  <Text style={styles.mensagemText}>
                    <Text style={{ fontWeight: 'bold', color: meta.cor }}>{meta.titulo}</Text>
                    {meta.texto}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.btnLimpar} onPress={limpar}>
              <Text style={styles.btnLimparText}>Refazer Cálculo</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#f4f7f8' },
  scrollContainer: { padding: 20, flexGrow: 1, alignItems: 'center', paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 15 },
  titulo: { fontSize: 32, fontWeight: '900', color: '#4180ab', marginLeft: 10, lineHeight: 36 },
  subtitulo: { fontSize: 16, color: '#6c757d', textAlign: 'center', marginBottom: 25, paddingHorizontal: 10 },
  sectionBox: { width: '100%', backgroundColor: '#ebf5fa', borderWidth: 2, borderColor: '#4180ab', borderRadius: 12, padding: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#4180ab', marginBottom: 10, textAlign: 'center' },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, marginBottom: 10, justifyContent: 'center' },
  optionCardHalf: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, justifyContent: 'center' },
  optionCardActive: { borderColor: '#4180ab', borderWidth: 2, backgroundColor: '#e1eff7' },
  optionText: { fontSize: 16, color: '#6c757d', marginLeft: 10, fontWeight: '500' },
  optionTextActive: { color: '#4180ab', fontWeight: 'bold' },
  row: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 20 },
  pregnantBox: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#fcecf2', borderWidth: 1, borderColor: '#f1b3c9', borderRadius: 8, padding: 15, marginBottom: 15 },
  pregnantBoxActive: { borderColor: '#c85a8b', borderWidth: 2 },
  pregnantText: { fontSize: 16, color: '#c85a8b', fontWeight: 'bold', marginLeft: 10 },
  pregnantExtraBox: { width: '100%', backgroundColor: '#fcecf2', borderWidth: 2, borderColor: '#c85a8b', borderRadius: 12, padding: 15, marginBottom: 15 },
  childBox: { width: '100%', backgroundColor: '#fef7e0', borderWidth: 2, borderColor: '#eec248', borderRadius: 12, padding: 15, marginBottom: 15 },
  childTitle: { fontSize: 16, fontWeight: 'bold', color: '#4a3f1d', marginBottom: 10 },
  childHelp: { fontSize: 14, color: '#8a7731', marginTop: 5 },
  mainInputs: { width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, marginBottom: 20 },
  labelDark: { fontSize: 15, fontWeight: 'bold', color: '#343a40', marginBottom: 5, marginTop: 10 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ced4da', borderRadius: 8, paddingHorizontal: 15, height: 50, marginBottom: 10 },
  inputIcon: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  btnCalcular: { flexDirection: 'row', backgroundColor: '#4180ab', width: '100%', height: 55, borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, elevation: 3, marginBottom: 30 },
  btnCalcularText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  btnLimpar: { backgroundColor: '#f4f7f8', borderWidth: 1, borderColor: '#ced4da', width: '100%', height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  btnLimparText: { fontSize: 16, color: '#6c757d', fontWeight: 'bold' },
  novoResultadoContainer: { width: '100%', alignItems: 'center' },
  imcCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#4180ab', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 5 },
  imcCircleValue: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  imcCircleLabel: { fontSize: 16, color: '#fff' },
  resultadoTituloPrincipal: { fontSize: 24, fontWeight: 'bold', color: '#343a40', marginBottom: 5, textAlign: 'center' },
  resultadoSubtitulo: { fontSize: 16, color: '#6c757d', marginBottom: 20 },
  progressBarContainer: { flexDirection: 'row', height: 20, width: '100%', borderRadius: 10, overflow: 'hidden', position: 'relative', marginBottom: 5, backgroundColor: '#e9ecef' },
  progressSegment: { height: '100%' },
  progressMarker: { position: 'absolute', top: -5, width: 10, height: 30, backgroundColor: '#fff', borderWidth: 3, borderColor: '#343a40', borderRadius: 5, zIndex: 10 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  progressLabelText: { fontSize: 12, color: '#6c757d' },
  pesoIdealCard: { width: '100%', backgroundColor: '#ebf5fa', borderRadius: 16, padding: 20, borderWidth: 2, borderColor: '#4180ab' },
  pesoIdealHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  pesoIdealTitle: { fontSize: 20, fontWeight: 'bold', color: '#4180ab', marginLeft: 10 },
  faixaSaudavelBox: { backgroundColor: '#fff', borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 20 },
  faixaSaudavelLabel: { fontSize: 16, color: '#6c757d', marginBottom: 5 },
  faixaSaudavelValue: { fontSize: 28, fontWeight: 'bold', color: '#4180ab' },
  comparativoBox: { backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 20 },
  pesoAtualValue: { fontSize: 24, fontWeight: 'bold', color: '#343a40' },
  pesoAtualLabel: { fontSize: 16, color: '#6c757d' },
  statusBox: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  statusText: { fontSize: 18, fontWeight: 'bold', color: '#4180ab', marginLeft: 5 },
  statusSubtext: { fontSize: 14, color: '#6c757d' },
  mensagemBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 15 },
  mensagemText: { fontSize: 14, color: '#343a40', marginLeft: 10, flex: 1 },
});