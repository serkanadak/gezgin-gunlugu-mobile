// Tüm çeviri sözlüklerini tek katalogda birleştirir.
// Her giriş: 'anahtar': { tr, en, de }
import common from './strings/common';
import trips from './strings/trips';
import discovery from './strings/discovery';
import expenses from './strings/expenses';
import docs from './strings/docs';
import checklist from './strings/checklist';

export const CATALOG = {
  ...common,
  ...trips,
  ...discovery,
  ...expenses,
  ...docs,
  ...checklist,
};
