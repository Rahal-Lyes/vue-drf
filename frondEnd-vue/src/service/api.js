/// IMPORTS
import axios from 'axios';
import router from '@/router';
import APIConfig from '@/config/api/settings';
import API_ENDPOINTS from '@/config/api/endpoints';

// Stores
import { useAuthStore } from '@/stores/AuthenticationStore';
import { useToastStore } from '@/stores/ToastStore';

// Utils
import { ACCESS_TOKEN_LOCAL_STORAGE } from '@/utils/local_storage';
import { FormatEndpoint } from '@/utils/find_endpoint';
import {
  ExceptionAPI,
  ExceptionNoRequest,
  ExceptionNoResponse,
} from '@/utils/exceptions';

// Axios instance
const instance = axios.create(APIConfig);

// 📦 Intercepteur de requête
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.custom_headers) {
      for (let key in config.custom_headers) {
        config.headers[key] = config.custom_headers[key];
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

// ❗ Intercepteur de réponse
instance.interceptors.response.use(
  response => response,
  error => {
    const toast_store = useToastStore();

    if (error.response) {
      const { status, data } = error.response;

      // 401 Unauthorized
      if (status === 401 || data?.code === 'token_not_valid') {
        const auth_store = useAuthStore();
        auth_store.ActionDoLogout().then(() => router.push({ path: '/login' }));
      }

      // Message d'erreur à afficher
      let message = 'Une erreur est survenue.';
      if (typeof data === 'object') {
        if (data.detail) {
          message = typeof data.detail === 'object'
            ? Object.values(data.detail).join(', ')
            : data.detail;
        } else {
          message = Object.values(data).join(', ');
        }
      }

      if (Math.floor(status / 100) === 4) {
        toast_store.ToastWarning({ message });
      } else {
        toast_store.ToastError({ message });
      }

      throw new ExceptionAPI(data);
    } else if (error.request) {
      throw new ExceptionNoResponse(error.request);
    } else {
      throw new ExceptionNoRequest(error.message);
    }
  }
);

// 💡 Génère un endpoint complet avec ID si besoin
function computeEndpointWithID(endpoint, id) {
  return typeof endpoint === 'function' ? endpoint(id) : `${endpoint}${id}/`;
}

// 🔧 Formate les paramètres de requête
function hydrateParameters(params, responseType) {
  const rawEndpoint = API_ENDPOINTS[params.endpoint] || params.endpoint;
  let endpoint = FormatEndpoint(rawEndpoint);
  if (params.id) endpoint = computeEndpointWithID(endpoint, params.id);

  return {
    method: params.method || 'GET',
    url: endpoint,
    data: params.data,
    params: params.params,
    responseType: responseType,
  };
}

// 🔐 Vérifie les permissions
function checkIfUserHasPermission(permission) {
  if (!permission) return true;
  const auth_store = useAuthStore();
  return auth_store.permissions.includes(permission);
}

// 🔔 Toast d'erreur permission
function toastNoPermissionError(permission) {
  const toast_store = useToastStore();
  toast_store.ToastWarning({
    message: {
      key: 'NoPermissionMessage',
      parameters: { permission },
    },
  });
}

// ✅ Toast succès
function toastSuccess(data, status) {
  const toast_store = useToastStore();
  const message = data?.detail || `Requête réussie [${status}]`;
  toast_store.ToastSuccess({ message });
}

// ✅ Callback par défaut
function onSuccessDefault(data) {
  console.log('[API Success]', data);
}

// 🚀 Fonction principale d'appel API
export default async function requestAPI({
  service,
  onSuccess = onSuccessDefault,
  permission_codename,
  responseType = 'json',
  toast = true,
}) {
  if (!checkIfUserHasPermission(permission_codename)) {
    return toastNoPermissionError(permission_codename);
  }

  const requestConfig = hydrateParameters(service, responseType);

  return await instance(requestConfig).then(response => {
    if (toast) toastSuccess(response.data, response.status);
    onSuccess(response.data);
  });
}
