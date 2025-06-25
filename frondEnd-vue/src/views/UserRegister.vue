/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1 class="title has-text-centered">
                <i class="fas fa-user-plus" aria-hidden="true"></i>
                Créer un compte
              </h1>

              <!-- Messages de succès -->
              <Transition name="slide-fade">
                <div
                  v-if="successMessage"
                  class="notification is-success"
                  role="alert"
                  aria-live="polite"
                >
                  <button
                    @click="successMessage = ''"
                    class="delete"
                    aria-label="Fermer le message de succès"
                  ></button>
                  <div class="notification-content">
                    <i class="fas fa-check-circle" aria-hidden="true"></i>
                    <strong>{{ successMessage }}</strong>
                  </div>
                </div>
              </Transition>

              <!-- Messages d'erreur -->
              <Transition name="slide-fade">
                <div
                  v-if="hasErrors"
                  class="notification is-danger"
                  role="alert"
                  aria-live="polite"
                >
                  <button
                    @click="clearErrors"
                    class="delete"
                    aria-label="Fermer les erreurs"
                  ></button>
                  <div class="notification-header">
                    <i
                      class="fas fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <strong>Erreurs de validation</strong>
                  </div>
                  <ul class="error-list">
                    <li
                      v-for="(error, index) in errors"
                      :key="index"
                      class="error-item"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </Transition>

              <form @submit.prevent="register" novalidate>
                <!-- Champ Nom d'utilisateur -->
                <div class="field">
                  <label class="label" for="username">
                    Nom d'utilisateur <span class="has-text-danger">*</span>
                  </label>
                  <div
                    class="control has-icons-left"
                    :class="{ 'has-icons-right': usernameError }"
                  >
                    <input
                      id="username"
                      type="text"
                      name="username"
                      class="input"
                      :class="{
                        'is-danger': usernameError,
                        'is-success':
                          form.username && !usernameError && usernameAvailable,
                      }"
                      v-model="form.username"
                      @blur="validateUsername"
                      @input="onUsernameInput"
                      placeholder="Votre nom d'utilisateur"
                      autocomplete="username"
                      required
                      minlength="3"
                      maxlength="20"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user" aria-hidden="true"></i>
                    </span>
                    <span v-if="usernameError" class="icon is-small is-right">
                      <i
                        class="fas fa-exclamation-triangle"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span
                      v-else-if="form.username && usernameAvailable"
                      class="icon is-small is-right"
                    >
                      <i class="fas fa-check" aria-hidden="true"></i>
                    </span>
                  </div>
                  <p v-if="usernameError" class="help is-danger">
                    {{ usernameError }}
                  </p>
                  <p
                    v-else-if="form.username && usernameAvailable"
                    class="help is-success"
                  >
                    Nom d'utilisateur disponible
                  </p>
                  <p class="help">
                    3-20 caractères, lettres, chiffres et tirets uniquement
                  </p>
                </div>

                <!-- Champ Email -->
                <div class="field">
                  <label class="label" for="email">
                    Adresse email <span class="has-text-danger">*</span>
                  </label>
                  <div
                    class="control has-icons-left"
                    :class="{ 'has-icons-right': emailError }"
                  >
                    <input
                      id="email"
                      type="email"
                      name="email"
                      class="input"
                      :class="{
                        'is-danger': emailError,
                        'is-success': form.email && !emailError,
                      }"
                      v-model="form.email"
                      @blur="validateEmail"
                      @input="clearFieldError('email')"
                      placeholder="votre@email.com"
                      autocomplete="email"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope" aria-hidden="true"></i>
                    </span>
                    <span v-if="emailError" class="icon is-small is-right">
                      <i
                        class="fas fa-exclamation-triangle"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <p v-if="emailError" class="help is-danger">
                    {{ emailError }}
                  </p>
                </div>

                <!-- Champ Mot de passe -->
                <div class="field">
                  <label class="label" for="password">
                    Mot de passe <span class="has-text-danger">*</span>
                  </label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      id="password"
                      :type="showPassword ? 'text' : 'password'"
                      name="password"
                      class="input"
                      :class="{
                        'is-danger': passwordError,
                        'is-success':
                          form.password &&
                          !passwordError &&
                          passwordStrength.score >= 3,
                      }"
                      v-model="form.password"
                      @blur="validatePassword"
                      @input="onPasswordInput"
                      placeholder="Votre mot de passe"
                      autocomplete="new-password"
                      required
                      minlength="8"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock" aria-hidden="true"></i>
                    </span>
                    <span
                      class="icon is-small is-right password-toggle"
                      @click="togglePassword"
                    >
                      <i
                        :class="
                          showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                        "
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>

                  <!-- Indicateur de force du mot de passe -->
                  <div v-if="form.password" class="password-strength">
                    <div class="password-strength-bar">
                      <div
                        class="password-strength-fill"
                        :class="passwordStrength.class"
                        :style="{ width: passwordStrength.score * 25 + '%' }"
                      ></div>
                    </div>
                    <p class="help" :class="passwordStrength.class">
                      Force: {{ passwordStrength.text }}
                    </p>
                  </div>

                  <p v-if="passwordError" class="help is-danger">
                    {{ passwordError }}
                  </p>
                  <p class="help">
                    Au moins 8 caractères avec majuscules, minuscules, chiffres
                    et symboles
                  </p>
                </div>

                <!-- Confirmation du mot de passe -->
                <div class="field">
                  <label class="label" for="confirmPassword">
                    Confirmer le mot de passe
                    <span class="has-text-danger">*</span>
                  </label>
                  <div
                    class="control has-icons-left"
                    :class="{ 'has-icons-right': confirmPasswordError }"
                  >
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      class="input"
                      :class="{
                        'is-danger': confirmPasswordError,
                        'is-success':
                          form.confirmPassword && !confirmPasswordError,
                      }"
                      v-model="form.confirmPassword"
                      @blur="validateConfirmPassword"
                      @input="clearFieldError('confirmPassword')"
                      placeholder="Confirmez votre mot de passe"
                      autocomplete="new-password"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock" aria-hidden="true"></i>
                    </span>
                    <span
                      v-if="confirmPasswordError"
                      class="icon is-small is-right"
                    >
                      <i
                        class="fas fa-exclamation-triangle"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <p v-if="confirmPasswordError" class="help is-danger">
                    {{ confirmPasswordError }}
                  </p>
                </div>

                <!-- Conditions d'utilisation -->
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        v-model="form.acceptTerms"
                        @change="clearFieldError('terms')"
                      />
                      J'accepte les
                      <a href="#" class="has-text-primary"
                        >conditions d'utilisation</a
                      >
                      et la
                      <a href="#" class="has-text-primary"
                        >politique de confidentialité</a
                      >
                      <span class="has-text-danger">*</span>
                    </label>
                  </div>
                  <p v-if="termsError" class="help is-danger">
                    {{ termsError }}
                  </p>
                </div>

                <!-- Newsletter optionnelle -->
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="form.newsletter" />
                      Je souhaite recevoir la newsletter et les actualités
                    </label>
                  </div>
                </div>

                <!-- Bouton de soumission -->
                <div class="field">
                  <div class="control">
                    <button
                      type="submit"
                      class="button is-primary is-fullwidth"
                      :class="{ 'is-loading': isLoading }"
                      :disabled="isLoading || !isFormValid"
                    >
                      <span class="icon">
                        <i class="fas fa-user-plus" aria-hidden="true"></i>
                      </span>
                      <span>Créer mon compte</span>
                    </button>
                  </div>
                </div>

                <!-- Liens utiles -->
                <div class="field">
                  <div class="content has-text-centered">
                    <p>
                      Déjà un compte ?
                      <a href="#" class="has-text-primary">Se connecter</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useUserStore } from "@/store/userStore.js";
const userStore=useUserStore()
// État du formulaire
const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  newsletter: false,
});

const showPassword = ref(false);
const isLoading = ref(false);
const successMessage = ref("");

// Erreurs
const errors = ref([]);
const usernameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const termsError = ref("");

// États de validation
const usernameAvailable = ref(false);

// Computed
const hasErrors = computed(() => errors.value.length > 0);

const isFormValid = computed(() => {
  return (
    form.value.username &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.acceptTerms &&
    !usernameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !termsError.value &&
    validateEmailFormat(form.value.email) &&
    passwordStrength.value.score >= 2
  );
});

const passwordStrength = computed(() => {
  const password = form.value.password;
  if (!password) return { score: 0, text: "", class: "" };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^A-Za-z0-9]/.test(password),
  };

  Object.values(checks).forEach((check) => {
    if (check) score++;
  });

  const strengthLevels = [
    { text: "Très faible", class: "has-text-danger" },
    { text: "Faible", class: "has-text-danger" },
    { text: "Moyen", class: "has-text-warning" },
    { text: "Bon", class: "has-text-info" },
    { text: "Excellent", class: "has-text-success" },
  ];

  return {
    score,
    ...strengthLevels[Math.min(score, 4)],
  };
});

// Méthodes de validation
const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUsernameFormat = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
};

const validateUsername = async () => {
  usernameError.value = "";
  usernameAvailable.value = false;

  if (!form.value.username) {
    usernameError.value = "Le nom d'utilisateur est requis";
  } else if (!validateUsernameFormat(form.value.username)) {
    usernameError.value =
      "Format invalide (3-20 caractères, lettres, chiffres, tirets)";
  } else {
    // Simulation de vérification de disponibilité
    await new Promise((resolve) => setTimeout(resolve, 500));
    usernameAvailable.value = true;
  }
};

const validateEmail = () => {
  emailError.value = "";

  if (!form.value.email) {
    emailError.value = "L'email est requis";
  } else if (!validateEmailFormat(form.value.email)) {
    emailError.value = "Format d'email invalide";
  }
};

const validatePassword = () => {
  passwordError.value = "";

  if (!form.value.password) {
    passwordError.value = "Le mot de passe est requis";
  } else if (form.value.password.length < 8) {
    passwordError.value = "Le mot de passe doit contenir au moins 8 caractères";
  } else if (passwordStrength.value.score < 2) {
    passwordError.value = "Le mot de passe est trop faible";
  }
};

const validateConfirmPassword = () => {
  confirmPasswordError.value = "";

  if (!form.value.confirmPassword) {
    confirmPasswordError.value = "La confirmation du mot de passe est requise";
  } else if (form.value.password !== form.value.confirmPassword) {
    confirmPasswordError.value = "Les mots de passe ne correspondent pas";
  }
};

const validateTerms = () => {
  termsError.value = "";

  if (!form.value.acceptTerms) {
    termsError.value = "Vous devez accepter les conditions d'utilisation";
  }
};

const validateForm = () => {
  errors.value = [];

  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateTerms();

  // Collecte des erreurs
  const fieldErrors = [
    usernameError.value,
    emailError.value,
    passwordError.value,
    confirmPasswordError.value,
    termsError.value,
  ];
  errors.value = fieldErrors.filter((error) => error);

  return errors.value.length === 0;
};

// Gestionnaires d'événements
const onUsernameInput = () => {
  clearFieldError("username");
  usernameAvailable.value = false;
};

const onPasswordInput = () => {
  clearFieldError("password");
  if (form.value.confirmPassword) {
    validateConfirmPassword();
  }
};

const clearErrors = () => {
  errors.value = [];
};

const clearFieldError = (field) => {
  switch (field) {
    case "username":
      usernameError.value = "";
      break;
    case "email":
      emailError.value = "";
      break;
    case "password":
      passwordError.value = "";
      break;
    case "confirmPassword":
      confirmPasswordError.value = "";
      break;
    case "terms":
      termsError.value = "";
      break;
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Soumission du formulaire
const register = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    userStore.setIsLoading(true);
   axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");

    // Simuler une requête d'inscription
    const formeData = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };
      await axios
      .post("/api/v1/token/login/", formeData)
      .then((response) => {
        // Stocker le token dans le localStorage
        const token = response.data.auth_token;
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        userStore.setToken(token);

        localStorage.setItem("token", response.data.auth_token);
        router.push("/");
      })
      .catch((error) => {
      
        if (error.response && error.response.data) {
          errors.value = Object.values(error.response.data).flat();
        } else {
          errors.value = [
            "Erreur de connexion au serveur. Veuillez réessayer plus tard.",
          ];
        }
            userStore.setIsLoading(false);
      });

    // Succès
    successMessage.value =
      "Compte créé avec succès ! Vérifiez votre email pour activer votre compte.";

    // Réinitialiser le formulaire
    Object.keys(form.value).forEach((key) => {
      if (typeof form.value[key] === "boolean") {
        form.value[key] = false;
      } else {
        form.value[key] = "";
      }
    });
  } catch (error) {
    errors.value = ["Erreur lors de l'inscription. Veuillez réessayer."];
  } finally {
    isLoading.value = false;
  }
};

// Surveillance des changements pour la validation en temps réel
watch(
  () => form.value.confirmPassword,
  () => {
    if (form.value.password && form.value.confirmPassword) {
      validateConfirmPassword();
    }
  }
);
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  color: #363636;
  margin-bottom: 2rem;
}

.title i {
  margin-right: 0.5rem;
  color: #3273dc;
}

.label {
  font-weight: 600;
  color: #363636;
}

.input:focus {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.password-toggle {
  cursor: pointer;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #3273dc;
}

.password-strength {
  margin-top: 0.5rem;
}

.password-strength-bar {
  height: 4px;
  background-color: #e5e5e5;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.password-strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.password-strength-fill.has-text-danger {
  background-color: #ff3860;
}

.password-strength-fill.has-text-warning {
  background-color: #ffdd57;
}

.password-strength-fill.has-text-info {
  background-color: #3273dc;
}

.password-strength-fill.has-text-success {
  background-color: #23d160;
}

.notification {
  margin-bottom: 1.5rem;
  border-radius: 6px;
}

.notification-header,
.notification-content {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.notification-header i,
.notification-content i {
  margin-right: 0.5rem;
}

.error-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.error-item {
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.error-item::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #fff;
}

.checkbox {
  font-size: 0.9rem;
}

.button.is-primary {
  background-color: #3273dc;
  transition: all 0.2s ease;
}

.button.is-primary:hover:not(:disabled) {
  background-color: #2366d1;
  transform: translateY(-1px);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .column.is-half {
    margin: 0 1rem;
  }

  .card {
    margin-top: 1rem;
  }
}
</style>
