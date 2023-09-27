import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import { pdfjs } from 'react-pdf';
import style from './Esign.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface PdfReaderProps {
  downloadFile: () => Promise<Blob>;
}

export default function PdfReader({ downloadFile }: PdfReaderProps) {
  const [totalPageNum, setTotalPageNum] = useState(null);
  const [fileUrl, setFileUrl] = useState<any>();

  function downloadPdf() {
    downloadFile()
      .then(response => {
        const blob = new Blob([response]);
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      })
      .catch(error => error);
  }

  useEffect(() => {
    downloadPdf();
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setTotalPageNum(numPages);
  }

  const pageLoading = (
    <div className={style.pdfLoading}>درحال بارگزاری ...</div>
  );
  const noDataMsg = (
    <div className={style.pdfLoading}>لطفا چند لحظه صبر کنید ...</div>
  );

  return (
    <div className={style.documentContainer}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={pageLoading}
        noData={noDataMsg}
      >
        {[...Array(totalPageNum).keys()].map(p => (
          <Page pageNumber={p + 1} key={p} />
        ))}
      </Document>
    </div>
  );
}
