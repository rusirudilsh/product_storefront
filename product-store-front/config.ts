export const EnvironmentSettings = {
    production: false , 
    appSettings: {
      title: "RD Products Store",
      environmentName: "Dev"
    },
    productsAPISettings: {
        baseUrl: 'http://localhost:8000/',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }),
      },

  };