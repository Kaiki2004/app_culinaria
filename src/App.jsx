import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('pasta');
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: search,
            number: 10,
            addRecipeInformation: true,
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const saveRecipe = (recipe) => {
    const saved = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    if (!saved.find(r => r.id === recipe.id)) {
      saved.push(recipe);
      localStorage.setItem('savedRecipes', JSON.stringify(saved));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🍝 Busca por receitas</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar receita..."
        />
        <button style={{ marginLeft: 10 }} type="submit">Buscar</button>
      </form>

      <div style={{ display: 'inline-block' }}>
        <Link to="/salvas" style={{ display: 'block', marginTop: 10 }}>
          Ver receitas salvas
        </Link>
      </div>

      {loading && <p>Carregando...</p>}

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} width={300} />
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            <button onClick={() => saveRecipe(recipe)}>Salvar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
