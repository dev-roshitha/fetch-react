import React,{ useState, useEffect } from "react";
import Preloader from "./components/Preloader"

function App() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if(!response.ok){
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts(data)
        setLoading(false)
        console.log(data)

      }catch(err){
        setError(err.message)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <Preloader />;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="app">
      <h1>All POSTS HERE</h1>
      <div className="cards-wrp">
        {posts.slice(0, 10).map(post => (
          <div key={post.id} className="card-item">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;