import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Typography, Modal, Fade, Backdrop, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: 'white',
});

const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  backgroundColor: 'white',
  boxShadow: 24,
  padding: 32,
  borderRadius: 16,
  overflowY: 'auto',
  outline: 'none',
});

const NewContentModal: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    categories: '',
    likes: 0,
    currentDevelopers: 0,
    maxDevelopers: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContent = {
      ...formData,
      categories: formData.categories.split(',').map((category) => category.trim()),
      likes: Number(formData.likes),
      currentDevelopers: Number(formData.currentDevelopers),
      maxDevelopers: Number(formData.maxDevelopers),
    };

    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContent),
    });

    if (response.ok) {
      router.push('/');
      handleClose();
    }
  };

  return (
    <Modal
      aria-labelledby="new-content-modal-title"
      aria-describedby="new-content-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          <Typography variant="h4" gutterBottom>
            {t('new_content')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('image')}
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('title')}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('description')}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('categories')}
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  helperText={t('categories_helper')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={t('current_developers')}
                  name="currentDevelopers"
                  type="number"
                  value={formData.currentDevelopers}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={t('max_developers')}
                  name="maxDevelopers"
                  type="number"
                  value={formData.maxDevelopers}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {t('submit')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default NewContentModal;
