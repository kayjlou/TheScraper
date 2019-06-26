// import axios from 'axios'
const app = express()

const Article = {
  scrape: _ => app.get('/scrape'),
  getStacks: _ => app.get('/stacks'),
  getFavorites: _ => app.get('/favorites'),
  addFavorite: id => app.put(`/stacks/${id}`),
  deleteStack: id => app.delete(`/stacks/${id}`)
}

export default Article