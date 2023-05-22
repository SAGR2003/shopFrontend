export const getSalesByDocument = async (document) => {
    const url = `http://localhost:8081/sales/${document}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    if (data && Array.isArray(data.listResponse)) {
        return data.listResponse;
    } else {
        return [];
    }
};

