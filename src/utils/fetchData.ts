export const fetchData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    mode: "cors",
  });
  let data = await response.json();

  try {
    if (response?.ok) {
      return data;
    } else {
      throw new Error("Desculpe, ocorreu um erro inesperado!");
    }
  } catch (error: any) {
    if (error) {
      return (data = { error: true, message: error.message });
    }
  }
};
