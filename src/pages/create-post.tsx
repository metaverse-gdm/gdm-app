import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Box, TextField, Button, Container, Typography } from '@mui/material'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
    if (response.ok) {
      router.push('/')
    } else {
      alert('Post creation failed')
    }
  }

  if (!session) {
    return (
        <Container maxWidth="sm">
          <Box mt={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              You must be logged in to create a post
            </Typography>
            <Button onClick={() => signIn('discord')} variant="contained" color="primary">
              Log in with Discord
            </Button>
          </Box>
        </Container>
    )
  }

  return (
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} mt={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Post
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
            Create Post
          </Button>
        </Box>
      </Container>
  )
}

export default CreatePost
