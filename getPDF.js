// src/utils/getPDF.js
export const getStoredPDF = () => {
    const base64 = localStorage.getItem('pdfData');
    if (!base64) return null;
  
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], 'stored.pdf', { type: 'application/pdf' });
  };
  