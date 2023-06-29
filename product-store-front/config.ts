export const EnvironmentSettings = {
    production: false , 
    appSettings: {
      title: "RD Products Store",
      environmentName: "Dev",
      productListPageSettings:{
        paginatorSettings:{
          itemsPerPage:5,
          rowsOptions: [5, 10, 20]
        }
      }
    },
    productsAPISettings: {
        baseUrl: 'http://localhost:8000/',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }),
      },
  };