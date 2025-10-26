import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

// Precisa disso para que o navegador feche automaticamente
WebBrowser.maybeCompleteAuthSession();

// Seu Client ID obtido no passo 1 do Azure
const CLIENT_ID = "ebb96258-700c-48ad-9f4a-e9122ef3aeb6";

// O endpoint de autorização da Microsoft
const DISCOVERY_ENDPOINT = "https://login.microsoftonline.com/common";

// A URL de retorno, precisa ser a mesma configurada no Azure
// AuthSession.makeRedirectUri() é a maneira mais segura no Expo
const REDIRECT_URI = AuthSession.makeRedirectUri({
  // Pode ser true se você estiver usando o Expo Go
});

export const useMicrosoftAuth = () => {
  // Scopes: Precisam corresponder às permissões que você solicitou no Azure
  const SCOPES = [
    "openid",
    "profile",
    "email",
    "offline_access",
    "Calendars.ReadWrite",
  ];

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: REDIRECT_URI,
    },
    {
      authorizationEndpoint: `${DISCOVERY_ENDPOINT}/oauth2/v2.0/authorize`,
      tokenEndpoint: `${DISCOVERY_ENDPOINT}/oauth2/v2.0/token`,
    }
  );

  // Função para obter o Token de Acesso
  const getAccessToken = async () => {
    if (response?.type === "success") {
      const { code } = response.params;

      // Aqui você precisaria enviar o código (code) para o endpoint de token
      // ou para um backend seguro para trocar por um Access Token,
      // mas para simplificar, você pode usar uma função de troca (Token Exchange) se o Expo permitir.

      // OBS: A troca de código por token (code exchange) deve ser feita com
      // muito cuidado no frontend em aplicações públicas.

      // No seu caso, você provavelmente terá que usar a função AuthSession.exchangeCodeAsync
      // ou enviar o 'code' para seu próprio backend que fará a troca de forma segura.

      // Se a sua URL de redirecionamento for um URI de tipo "Public Client",
      // você pode tentar a troca no frontend (menos seguro, mas mais simples):
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          code: code,
          redirectUri: REDIRECT_URI,
          extraParams: {
            code_verifier: request?.codeVerifier || "",
          },
        },
        {
          tokenEndpoint: `${DISCOVERY_ENDPOINT}/oauth2/v2.0/token`,
        }
      );

      return tokenResult.accessToken;
    }
    return null;
  };

  return { promptAsync, getAccessToken, request, response };
};
