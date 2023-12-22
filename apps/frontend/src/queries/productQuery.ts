const getProductQuery = async (query: string) => {

  try {
    const response = await fetch('http://localhost:8080/proveedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: String(query),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    console.log("data: ",response.json)
    
    return await response.json();
  } catch (error) {
      console.log("hubo error aqui:" , error)
    throw error;
  }
};

export { getProductQuery };