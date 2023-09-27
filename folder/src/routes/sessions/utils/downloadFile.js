const downloadFile = (url, name) => {
  const link = document.createElement('a');
  link.setAttribute('download', name);
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
export default downloadFile;
