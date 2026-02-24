import projectsRaw from './projects.json'
import postsRaw from './posts.json'
import postCategoriesRaw from './post-categories.json'
import productsRaw from './products.json'
import productCategoriesRaw from './product-categories.json'

const parseBool = (value) => String(value).toLowerCase() === 'true'

const normalizeProject = (row) => ({
  name: row.Name?.trim() || '',
  slug: row.Slug?.trim() || '',
  summary: row['Project Summary'] || '',
  details: row['Project Details'] || '',
  category: row.Category?.trim() || '',
  client: row.Client?.trim() || '',
  year: row.Year?.trim() || '',
  featured: parseBool(row['Featured Project?']),
  images: [row['Main Project Image'], row['Second Project Image'], row['Third Project Image']].filter(Boolean),
  video: row['Video Link'] || '',
})

const normalizePostCategory = (row) => ({
  name: row.Name?.trim() || '',
  slug: row.Slug?.trim() || '',
  color: row.Color || '',
})

const normalizePost = (row) => ({
  name: row.Name?.trim() || '',
  slug: row.Slug?.trim() || '',
  body: row['Post Body'] || '',
  summary: row['Post Summary'] || '',
  date: row['Data Created'] || row['Published On'] || row['Created On'] || '',
  image: row['Main Image'] || '',
  featured: parseBool(row['Featured?']),
  categorySlug: row.Categories?.trim() || '',
})

const normalizeProductCategory = (row) => ({
  name: row.Name?.trim() || '',
  slug: row.Slug?.trim() || '',
})

const normalizeProduct = (row) => ({
  name: row['Product Name']?.trim() || '',
  slug: row['Product Handle']?.trim() || '',
  description: row['Product Description'] || '',
  categories: row['Product Categories']?.split(',').map((c) => c.trim()).filter(Boolean) || [],
  image: row['Main Variant Image'] || '',
  price: row['Variant Price'] || '',
})

const postCategories = postCategoriesRaw.map(normalizePostCategory)
const postCategoryMap = new Map(postCategories.map((cat) => [cat.slug, cat]))

const projects = projectsRaw.map(normalizeProject)
const posts = postsRaw.map((row) => {
  const post = normalizePost(row)
  post.category = postCategoryMap.get(post.categorySlug) || null
  return post
})
const productCategories = productCategoriesRaw.map(normalizeProductCategory)
const products = productsRaw.map(normalizeProduct)

export const cms = {
  projects,
  posts,
  postCategories,
  products,
  productCategories,
}

export const getProjectBySlug = (slug) => projects.find((item) => item.slug === slug)
export const getPostBySlug = (slug) => posts.find((item) => item.slug === slug)
export const getProductBySlug = (slug) => products.find((item) => item.slug === slug)
