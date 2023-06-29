export const EnvironmentSettings = {
    production: false , 
    appSettings: {
      title: "RD Products Store",
      environmentName: "Dev",
      productListPageSettings:{
        paginatorSettings:{
          itemsPerPage:10,
          rowsOptions: [10, 20]
        }
      }
    },
    productsAPISettings: {
        baseUrl: 'http://localhost:8000/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      },
  };