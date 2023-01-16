export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  try {
    if (response.ok) {
      return data;
    } else {
      throw new Error("Ocorreu um erro inesperado!");
    }
  } catch (error: any) {
    if (error) {
      alert(error.message);
    }
  }
};
