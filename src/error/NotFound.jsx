import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>🚫 404</h1>
      <p>Página não encontrada</p>
      <Link to="/" style={{ marginTop: 20, display: 'inline-block' }}>
        Voltar para a Home
      </Link>
    </div>
  );
};

export default NotFound;
