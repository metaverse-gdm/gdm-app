import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ContentCardDetailsModal from './ContentCardDetailsModal';

interface ContentCardProps {
  image: string;
  title: string;
  description: string;
  categories?: string[];
  likes: number;
  currentDevelopers: number;
  maxDevelopers: number;
}

const CardContainer = styled(Card)({
  maxWidth: 345,
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: '16px',
  overflow: 'hidden', // 追加
});

const Media = styled(CardMedia)({
  height: 200,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
});

const CardContentContainer = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px',
});

const Footer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 16px',
  borderTop: '1px solid #e0e0e0',
  backgroundColor: '#fafafa',
});

const CategoryBox = styled(Box)({
  marginTop: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
});

const Likes = styled(Typography)({
  color: '#d32f2f',
  display: 'flex',
  alignItems: 'center',
});

const Developers = styled(Typography)({
  color: '#1976d2',
});

const ContentCard: React.FC<ContentCardProps> = ({ image, title, description, categories = [], likes, currentDevelopers, maxDevelopers }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CardContainer onClick={handleOpen}>
        <Media
          image={image}
          title={title}
        />
        <CardContentContainer>
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </Box>
          <CategoryBox>
            {categories.map((category, index) => (
              category &&
              <Chip key={index} label={category} color="primary" size="small" />
            ))}
          </CategoryBox>
        </CardContentContainer>
        <Footer>
          <Developers variant="body2">
            {t('current_developers')} {currentDevelopers}/{maxDevelopers}
          </Developers>
          <Likes variant="body2">
            <Favorite fontSize="small" style={{ marginRight: '5px' }} />
            {likes}
          </Likes>
        </Footer>
      </CardContainer>

      <ContentCardDetailsModal
        open={open}
        handleClose={handleClose}
        image={image}
        title={title}
        description={description}
        categories={categories}
        likes={likes}
        currentDevelopers={currentDevelopers}
        maxDevelopers={maxDevelopers}
      />
    </>
  );
};

export default ContentCard;
