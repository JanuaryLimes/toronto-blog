import path from 'path';
import moduleAlias from 'module-alias';

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

if (isProduction()) {
  moduleAlias.addAlias('@shared', path.resolve(__dirname, '/shared'));
} else {
  moduleAlias.addAlias('@shared', path.resolve(__dirname, '../shared'));
}
