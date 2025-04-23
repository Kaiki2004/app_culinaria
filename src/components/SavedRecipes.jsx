import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const SavedRecipes = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setSaved(stored);
  }, []);

  const handleDelete = (id) => {
    const filtered = saved.filter((r) => r.id !== id);
    setSaved(filtered);
    localStorage.setItem('savedRecipes', JSON.stringify(filtered));
  };


  return (
    <div style={{ padding: 20 }}>
      <h1>📌 Receitas Salvas</h1>
      {saved.length === 0 && <p>Nenhuma receita salva ainda.</p>}
      <div className="recipes-grid">
        {saved.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            <button onClick={() => handleDelete(recipe.id)} style={{ marginTop: '1rem' }}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;