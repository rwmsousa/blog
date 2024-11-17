export const callRevalidate = async ({ req, doc }: { req: any, doc: any }) => {
  const path = doc.pagina;
  if (!path) return;
  try {

    const url = `${process.env.PAYLOAD_PUBLIC_REVALIDATE_SITE}/revalidate?secret=${process.env.TOKEN_REVALIDATE}&path=${encodeURIComponent(path)}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody);
    }

    console.log(
      `Revalidate chamado com sucesso - ${new Date()
        .toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        .replace(',', '')} - ${path}`,
    );
  } catch (error) {
    console.log(`${JSON.parse(error as string)}`);
  }
};
