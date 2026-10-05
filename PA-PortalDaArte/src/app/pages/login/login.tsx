import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

export default function IndexScreen() {
  const [isArtist, setIsArtist] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*
   * Calcula a força da senha.
   *
   * A avaliação considera:
   * - quantidade de caracteres
   * - letras minúsculas
   * - letras maiúsculas
   * - números
   * - símbolos
   * - caracteres estrangeiros/acentuados
   */
  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        level: 0,
        text: '',
      };
    }

    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;

    if (/[a-záàâãéêíóôõúüç]/u.test(password)) {
      score++;
    }

    if (/[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ]/u.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^a-zA-ZÀ-ÿ0-9]/u.test(password)) {
      score++;
    }

    if (score <= 2) {
      return {
        level: 1,
        text: 'Fraca',
      };
    }

    if (score <= 4) {
      return {
        level: 2,
        text: 'Média',
      };
    }

    return {
      level: 3,
      text: 'Forte',
    };
  }, [password]);

  /*
   * Cliente e Artista não podem ficar selecionados
   * simultaneamente.
   */

  const handleArtistToggle = () => {
    setIsArtist(true);
    setIsClient(false);
  };

  const handleClientToggle = () => {
    setIsClient(true);
    setIsArtist(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        {/* CÍRCULOS DECORATIVOS */}

        <View style={styles.circleTopLeft} />
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomRight} />

        {/* CARTÃO CENTRAL */}

        <View style={styles.loginCard}>

          {/* MARCA */}

          <View style={styles.logoBox}>
            <Text style={styles.logoSymbol}>●</Text>
          </View>

          {/* TÍTULO */}

          <Text style={styles.title}>
            Entrar no Portal da Arte
          </Text>

          <Text style={styles.subtitle}>
            Acesse sua conta para gerenciar contratações, mensagens e
            {'\n'}
            seu perfil
          </Text>


          {/* TIPO DE USUÁRIO */}

          <Text style={styles.question}>
            Quem você é?
          </Text>

          <View style={styles.userTypes}>

            {/* ARTISTA */}

            <TouchableOpacity
              style={styles.userType}
              activeOpacity={0.8}
              onPress={handleArtistToggle}
            >

              <View style={styles.userTypeTextContainer}>

                <Text style={styles.userTypeTitle}>
                  Artista
                </Text>

                <Text style={styles.userTypeDescription}>
                  Agenda, propostas e
                </Text>

                <Text style={styles.userTypeDescription}>
                  contratações
                </Text>

              </View>

              <View
                style={[
                  styles.toggle,
                  isArtist && styles.toggleActive,
                ]}
              >

                <View
                  style={[
                    styles.toggleCircle,
                    isArtist && styles.toggleCircleActive,
                  ]}
                />

              </View>

            </TouchableOpacity>


            {/* CLIENTE */}

            <TouchableOpacity
              style={styles.userType}
              activeOpacity={0.8}
              onPress={handleClientToggle}
            >

              <View style={styles.userTypeTextContainer}>

                <Text style={styles.userTypeTitle}>
                  Cliente
                </Text>

                <Text style={styles.userTypeDescription}>
                  Busca, favoritos e
                </Text>

                <Text style={styles.userTypeDescription}>
                  contratações
                </Text>

              </View>

              <View
                style={[
                  styles.toggle,
                  isClient && styles.toggleActive,
                ]}
              >

                <View
                  style={[
                    styles.toggleCircle,
                    isClient && styles.toggleCircleActive,
                  ]}
                />

              </View>

            </TouchableOpacity>

          </View>


          {/* E-MAIL */}

          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="nome@email.com"
            placeholderTextColor="#9D8E85"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />


          {/* SENHA */}

          <View style={styles.passwordLabelRow}>

            <Text style={styles.label}>
              Senha
            </Text>

          </View>

          <View style={styles.passwordContainer}>

            <Text style={styles.lockSymbol}>
              ♧
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9D8E85"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.passwordInput}
            />

          </View>


          {/* MEDIDOR DE SENHA */}

          {password.length > 0 && (
            <View style={styles.strengthContainer}>

              <View style={styles.strengthBars}>

                <View
                  style={[
                    styles.strengthBar,
                    passwordStrength.level >= 1 &&
                      styles.strengthBarActive,
                  ]}
                />

                <View
                  style={[
                    styles.strengthBar,
                    passwordStrength.level >= 2 &&
                      styles.strengthBarActive,
                  ]}
                />

                <View
                  style={[
                    styles.strengthBar,
                    passwordStrength.level >= 3 &&
                      styles.strengthBarActive,
                  ]}
                />

              </View>

              <Text style={styles.strengthText}>
                {passwordStrength.text}
              </Text>

            </View>
          )}


          {/* ESQUECEU A SENHA */}

          <TouchableOpacity
            style={styles.forgotButton}
            activeOpacity={0.7}
          >

            <Text style={styles.forgotText}>
              Esqueceu a senha?
            </Text>

          </TouchableOpacity>


          {/* BOTÃO ENTRAR */}

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.85}
          >

            <Text style={styles.loginButtonText}>
              Entrar
            </Text>

          </TouchableOpacity>


          {/* CADASTRO */}

          <View style={styles.registerContainer}>

            <Text style={styles.registerText}>
              Não tem conta?
            </Text>

            <TouchableOpacity activeOpacity={0.7}>

              <Text style={styles.registerLink}>
                Cadastre-se
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}


/* ===================================================== */
/* ESTILOS */
/* ===================================================== */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#FFF1E6',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF1E6',

    ...Platform.select({
      web: {
        minHeight: '100vh',
        overflow: 'hidden',
      },
    }),
  },


  /* ================================================ */
  /* CÍRCULOS DO FUNDO */
  /* ================================================ */

  circleTopLeft: {
    position: 'absolute',
    width: 195,
    height: 195,
    borderRadius: 100,
    backgroundColor: '#FFE9D2',
    top: -55,
    left: -50,
  },

  circleTopRight: {
    position: 'absolute',
    width: 205,
    height: 205,
    borderRadius: 105,
    backgroundColor: '#F9DDD0',
    top: 17,
    right: 132,
  },

  circleBottomRight: {
    position: 'absolute',
    width: 195,
    height: 195,
    borderRadius: 100,
    backgroundColor: '#F9DDD0',
    bottom: -55,
    right: -50,
  },


  /* ================================================ */
  /* CARTÃO */
  /* ================================================ */

  loginCard: {
    width: 246,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,

    paddingTop: 18,
    paddingBottom: 17,
    paddingHorizontal: 18,

    shadowColor: '#6D4D3E',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,

    elevation: 4,
  },


  /* ================================================ */
  /* LOGO */
  /* ================================================ */

  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#FFF6EF',

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 8,
  },

  logoSymbol: {
    fontSize: 9,
    color: '#E15743',
  },


  /* ================================================ */
  /* TÍTULO */
  /* ================================================ */

  title: {
    color: '#493027',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',

    marginBottom: 4,
  },

  subtitle: {
    color: '#95857B',
    fontSize: 7,
    lineHeight: 10,
    textAlign: 'center',

    marginBottom: 12,
  },


  /* ================================================ */
  /* USUÁRIO */
  /* ================================================ */

  question: {
    color: '#493027',
    fontSize: 7,
    fontWeight: '700',

    marginBottom: 5,
  },

  userTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 10,
  },

  userType: {
    width: '48%',
    minHeight: 42,

    borderWidth: 1,
    borderColor: '#F0E3DA',
    borderRadius: 6,

    paddingHorizontal: 7,
    paddingVertical: 5,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userTypeTextContainer: {
    flex: 1,
  },

  userTypeTitle: {
    color: '#493027',
    fontSize: 7,
    fontWeight: '700',

    marginBottom: 1,
  },

  userTypeDescription: {
    color: '#9A8980',
    fontSize: 5.5,
    lineHeight: 7,
  },


  /* ================================================ */
  /* TOGGLE */
  /* ================================================ */

  toggle: {
    width: 22,
    height: 12,
    borderRadius: 8,

    backgroundColor: '#E6DDD7',

    justifyContent: 'center',
    paddingHorizontal: 2,
  },

  toggleActive: {
    backgroundColor: '#E15743',
  },

  toggleCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,

    backgroundColor: '#FFFFFF',
  },

  toggleCircleActive: {
    alignSelf: 'flex-end',
  },


  /* ================================================ */
  /* LABEL */
  /* ================================================ */

  label: {
    color: '#493027',
    fontSize: 7,
    fontWeight: '700',

    marginBottom: 4,
  },


  /* ================================================ */
  /* INPUT */
  /* ================================================ */

  input: {
    height: 27,

    borderWidth: 1,
    borderColor: '#F0E3DA',
    borderRadius: 6,

    backgroundColor: '#FFF9F5',

    paddingHorizontal: 8,

    color: '#493027',
    fontSize: 7,

    marginBottom: 9,

    outlineStyle: 'none',
  },


  /* ================================================ */
  /* SENHA */
  /* ================================================ */

  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  passwordContainer: {
    height: 27,

    borderWidth: 1,
    borderColor: '#F0E3DA',
    borderRadius: 6,

    backgroundColor: '#FFF9F5',

    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 7,
  },

  lockSymbol: {
    color: '#88766D',
    fontSize: 10,

    marginRight: 4,
  },

  passwordInput: {
    flex: 1,

    height: 25,

    color: '#493027',
    fontSize: 8,

    paddingVertical: 0,
    paddingHorizontal: 0,

    outlineStyle: 'none',
  },


  /* ================================================ */
  /* FORÇA DA SENHA */
  /* ================================================ */

  strengthContainer: {
    height: 12,

    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 3,
  },

  strengthBars: {
    flex: 1,

    flexDirection: 'row',

    gap: 2,

    marginRight: 5,
  },

  strengthBar: {
    height: 2,

    flex: 1,

    borderRadius: 2,

    backgroundColor: '#EDE4DE',
  },

  strengthBarActive: {
    backgroundColor: '#E15743',
  },

  strengthText: {
    color: '#9A8980',
    fontSize: 5.5,

    width: 27,
  },


  /* ================================================ */
  /* ESQUECEU SENHA */
  /* ================================================ */

  forgotButton: {
    alignSelf: 'flex-end',

    marginTop: 3,
    marginBottom: 12,
  },

  forgotText: {
    color: '#E15743',
    fontSize: 6.5,
  },


  /* ================================================ */
  /* ENTRAR */
  /* ================================================ */

  loginButton: {
    height: 25,

    borderRadius: 6,

    backgroundColor: '#E15743',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 7,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '700',
  },


  /* ================================================ */
  /* CADASTRO */
  /* ================================================ */

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerText: {
    color: '#A2938B',
    fontSize: 6.5,
  },

  registerLink: {
    color: '#E15743',
    fontSize: 6.5,
    fontWeight: '700',

    marginLeft: 2,
  },

});