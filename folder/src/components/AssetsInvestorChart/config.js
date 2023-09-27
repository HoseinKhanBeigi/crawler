export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      display: false,
      borderRadius: 40,
      rtl: true,
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        padding: 30,
        font: {
          family: 'iranyekan',
          weight: 'bold',
        },
      },
    },
    tooltip: {
      rtl: true,
      bodyFont: {
        family: 'iranyekan',
        weight: 'bold',
      },
      titleFont: {
        family: 'iranyekan',
        weight: 'bold',
      },
    },
  },
  scales: {
    x: {
      display: true,
      ticks: {
        font: {
          family: 'iranyekan',
          weight: 'bold',
          color: '#0000000',
        },
        rtl: true,
        padding: 8,
      },
    },
    y: {
      display: true,
      ticks: {
        font: {
          family: 'iranyekan',
          weight: 'bold',
          color: '#0000000',
        },
        rtl: true,
        padding: 8,
      },
      title: {
        display: true,
        font: {
          family: 'iranyekan',
          size: 14,
        },
        text: 'اعداد به میلیون ریال',
        color: '#aaadb5',
        padding: { top: 0, left: 0, right: 20, bottom: 0 },
      },
    },
  },
};
