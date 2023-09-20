import opportunityService from '../../service/opportunityService';

const handleUploadSepExcel = (e, refresh) => {
  const input = document.getElementById('sep-upload');
  opportunityService
    .uploadSepData(e?.target?.files[0])
    .then(refresh)
    .finally(() => {
      input.value = '';
    });
};

export const extraActions = {
  sep: [
    {
      tooltip: 'دانلود اکسل',
      icon: 'download',
      action: () => opportunityService.downloadSepDataAsExcel(),
    },
    {
      tooltip: 'جلو بردن همه',
      icon: 'step-backward',
      action: refresh => {
        opportunityService.forwardAllSepPipeline().then(refresh);
      },
    },
  ],
  pending_sep: [
    {
      tooltip: 'آپلود اکسل',
      icon: 'upload',
      action: refresh => {
        const input = document.getElementById('sep-upload');
        input.onchange = e => handleUploadSepExcel(e, refresh);
        input.click();
      },
    },
  ],
};
