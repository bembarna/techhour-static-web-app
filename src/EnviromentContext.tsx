export const getURL = () => {
      if(process.env.NODE_ENV !== 'production') {
        return 'http://localhost:7071/api/';
      }
      else{
        return `api/`;
      }
}