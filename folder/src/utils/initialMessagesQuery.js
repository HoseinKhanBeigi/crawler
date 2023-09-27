import enUS from '../locale/en-US.json';
import faIR from '../locale/fa-IR.json';

const languages = {
  'en-US': enUS,
  'fa-IR': faIR,
};

export default function initialMessagesQuery(locale) {
  return languages[locale].map(({ id, message }) => ({ id, message }));
}
