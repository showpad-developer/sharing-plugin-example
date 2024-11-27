import "./index.css";
import {
  Auth,
  createContentPicker,
  createClientCredentialsProvider,
  AuthProvider,
} from "@showpad/content-picker";
// setup DOM
document.querySelector("#root")!.innerHTML = `
<h1>Basic Showpad Plugin</h1>
  <section>
    <div id="content-picker" class="content">
    </div>
    <aside>
        <button id="create-share">Create Share</button>
        <h2>Output</h2>
        <pre>{}</pre>
    </aside>
</section>
`;
// Register the Auth provider

// Use the following code to use the Auth provider with client credentials - this is not recommended for Frontend applications
const clientCreds = createClientCredentialsProvider({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "https://localhost:8080",
  subdomain: "YOUR_SUBDOMAIN",
});

// Use the following code to use the Auth provider with a static token and subdomain
// const accessTokenProvider: AuthProvider = {
//   async getToken() {
//     return "YOUR_API_TOKEN";
//   },
//   async getOrgInfo() {
//     return {
//       subdomain: "YOUR_SUBDOMAIN",
//     };
//   },
// };
Auth.registerProvider(clientCreds);

function selectShowpadContent() {
  return new Promise<
    {
      id: string;
    }[]
  >(async (resolve) => {
    // Create the content picker
    const contentPicker = await createContentPicker(
      document.getElementById("content-picker")!,
      {
        onSelectAssets: (assets) => {
          contentPicker.close();
          resolve(assets);
        },
        allowMultipleSelection: true,
        language: "en",
        onPreview: (url) => window.open(url, "_blank"),
      }
    );
    // Open the content picker
    await contentPicker.open();
  });
}

async function createShowpadShare(
  assets: {
    id: string;
  }[]
) {
  const { subdomain } = await Auth.provider.getOrgInfo();
  const token = await Auth.provider.getToken(false);
  return fetch(`https://${subdomain}.api.showpad.com/v4/shares`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      assets,
      title: "Showpad Share from basic plugin",
      origin: "Basic Sharing plugin",
      isDownloadAllowed: true,
    }),
  }).then((response) => response.json());
}

const button = document.getElementById("create-share")!;

button.addEventListener("click", async (e) => {
  button.setAttribute("disabled", "true");
  const assets = await selectShowpadContent();
  const result = await createShowpadShare(assets);
  document.querySelector("pre")!.textContent = JSON.stringify(result, null, 2);
  button.setAttribute("disabled", "false");
});
