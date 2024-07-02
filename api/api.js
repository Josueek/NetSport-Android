// api/api.js

const registerClient = async (clientData) => {
    const url = 'http://192.168.1.94/NetSports/Api/services/public/registro.php?action=createRow';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering client:', error);
      return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
  };
  
  export { registerClient };
  