// File: ./components/ContentCardDetailsModal.tsx

import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography, Chip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';

interface ContentCardDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  image: string;
  title: string;
  description: string;
  categories?: string[];
  likes: number;
  currentDevelopers: number;
  maxDevelopers: number;
}

const CategoryBox = styled(Box)({
  marginTop: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
});

const Footer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderTop: '1px solid #e0e0e0',
  backgroundColor: '#fafafa',
});

const Likes = styled(Typography)({
  color: 'gray',
  display: 'flex',
  alignItems: 'center',
});

const Developers = styled(Typography)({
  color: 'blue',
});

const ContentCardDetailsModal: React.FC<ContentCardDetailsModalProps> = ({ open, handleClose, image, title, description, categories = [], likes, currentDevelopers, maxDevelopers }) => {
  const { t } = useTranslation();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', // 幅を80%に設定
          height: '90%', // 高さを80%に設定
          backgroundColor: 'white',
          boxShadow: 24,
          padding: 32, // パディングを32に増やす
          borderRadius: 8,
          overflowY: 'auto', // コンテンツが多い場合のスクロール対応
        }}>
          <Typography id="transition-modal-title" variant="h4" component="h2">
            {title}
          </Typography>
          <img src={image} alt={title} style={{ width: '100%', marginTop: 16, borderRadius: 8 }} />
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <CategoryBox>
            {categories.map((category, index) => (
              <Chip key={index} label={category} color="primary" size="small" />
            ))}
          </CategoryBox>
          <Footer>
            <Likes variant="body2">
              <Favorite fontSize="small" style={{ marginRight: '5px', color: 'red' }} />
              {likes}
            </Likes>
            <Developers variant="body2">
              {t('current_developers')} {currentDevelopers}/{maxDevelopers}
            </Developers>
          </Footer>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ContentCardDetailsModal;
