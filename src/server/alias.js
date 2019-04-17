import path from 'path';
import moduleAlias from 'module-alias';

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

console.log(
  'is Production',
  isProduction(),
  path.resolve(__dirname, './shared')
);

if (isProduction()) {
  moduleAlias.addAlias('@shared', path.resolve(__dirname, './shared'));
} else {
  moduleAlias.addAlias('@shared', path.resolve(__dirname, '../shared'));
}
