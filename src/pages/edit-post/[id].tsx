import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Box, TextField, Button, Container, Typography } from '@mui/material'

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((post) => {
          setTitle(post.title)
          setContent(post.content)
        })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/posts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, content })
    })
    if (response.ok) {
      router.push('/')
    } else {
      alert('Post update failed')
    }
  }

  if (!session) {
    return <p>You must be logged in to edit a post</p>
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Post
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Post
        </Button>
      </Box>
    </Container>
  )
}

export default EditPost
