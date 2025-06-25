<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1 class="title has-text-centered">
                <i class="fas fa-user-circle" aria-hidden="true"></i>
                Connexion
              </h1>

              <!-- Notification d'erreurs -->
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
                    lyes
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

              <form @submit.prevent="submitForm" novalidate>
                <!-- Champ Email -->
                <div class="field">
                  <label class="label" for="email">
                    Email <span class="has-text-danger">*</span>
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
                        'is-success': email && !emailError,
                      }"
                      v-model="email"
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
                        'is-success': password && !passwordError,
                      }"
                      v-model="password"
                      @blur="validatePassword"
                      @input="clearFieldError('password')"
                      placeholder="Votre mot de passe"
                      autocomplete="current-password"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock" aria-hidden="true"></i>
                    </span>
                    <!-- <span
                      class="icon is-small is-right password-toggle"
                      @keyup.enter="togglePassword"
                      @click="togglePassword"
                      tabindex="0"
                      role="button"
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      <i
                        :class="
                          showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                        "
                        aria-hidden="true"
                      ></i>
                    </span> -->
                    <span
                      class="icon is-small is-right password-toggle"
                      @click="togglePassword"
                      tabindex="0"
                      role="button"
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      <i
                        :class="
                          showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                        "
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <p v-if="passwordError" class="help is-danger">
                    {{ passwordError }}
                  </p>
                </div>

                <!-- Options supplémentaires -->
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="rememberMe" />
                      Se souvenir de moi
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
                        <i class="fas fa-sign-in-alt" aria-hidden="true"></i>
                      </span>
                      <span>Se connecter</span>
                    </button>
                  </div>
                </div>

                <!-- Liens utiles -->
                <div class="field">
                  <div class="content has-text-centered">
                    <p>
                      <a href="#" class="has-text-primary"
                        >Mot de passe oublié ?</a
                      >
                    </p>
                    <p>
                      Pas encore de compte ?
                      <a href="#" class="has-text-primary">S'inscrire</a>
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
import { ref, computed } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore.js";
import { useToastStore } from "@/store/ToastStore.js";
const userStore = useUserStore();
import { useRouter } from "vue-router";
const router = useRouter();
const toast_store = useToastStore();
// État du formulaire
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const isLoading = ref(false);

// Erreurs
const errors = ref([]);
const emailError = ref("");
const passwordError = ref("");

// Computed
const hasErrors = computed(() => errors.value.length > 0);

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    !emailError.value &&
    !passwordError.value &&
    validateEmailFormat(email.value)
  );
});

// Méthodes de validation
const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateEmail = () => {
  emailError.value = "";

  if (!email.value) {
    emailError.value = "L'email est requis";
  } else if (!validateEmailFormat(email.value)) {
    emailError.value = "Format d'email invalide";
  }
};

const validatePassword = () => {
  passwordError.value = "";

  if (!password.value) {
    passwordError.value = "Le mot de passe est requis";
  } else if (password.value.length < 6) {
    passwordError.value = "Le mot de passe doit contenir au moins 6 caractères";
  }
};

const validateForm = () => {
  errors.value = [];

  validateEmail();
  validatePassword();

  // Collecte des erreurs pour la notification globale
  if (emailError.value) errors.value.push(emailError.value);
  if (passwordError.value) errors.value.push(passwordError.value);

  return errors.value.length === 0;
};

// Méthodes utilitaires
const clearErrors = () => {
  errors.value = [];
};

const clearFieldError = (field) => {
  if (field === "email") emailError.value = "";
  if (field === "password") passwordError.value = "";
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Soumission du formulaire
const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    userStore.setIsLoading(true);
    const formData = {
      email: email.value,
      password: password.value,
    };
    await axios
      .post("/api/v1/users/", formData)
      .then((response) => {
        if (response.status === 200) {
          toast_store.ToastSuccess({
            message: "Login réussi !",
          });
          router.push("/login");
        }
      })
      .catch((error) => {
        toast_store.ToastError({
          message: "Erreur de connexion. Veuillez réessayer, " + error,
        });
      });
  } catch (error) {
    errors.value = ["Erreur de connexion. Veuillez réessayer."];
  } finally {
    userStore.setIsLoading(false);
  }
};
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

.notification {
  margin-bottom: 1.5rem;
  border-radius: 6px;
}

.notification-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.notification-header i {
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
  .column.is-4 {
    margin: 0 1rem;
  }

  .card {
    margin-top: 1rem;
  }
}
</style>
