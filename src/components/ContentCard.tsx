import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

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
});

const Media = styled(CardMedia)({
  height: 180,
});

const CardContentContainer = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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
  color: 'gray',
  display: 'flex',
  alignItems: 'center',
});

const Developers = styled(Typography)({
  color: 'blue',
});

const ContentCard: React.FC<ContentCardProps> = ({ image, title, description, categories = [], likes, currentDevelopers, maxDevelopers }) => {
  const { t } = useTranslation();

  return (
    <CardContainer>
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
            <Chip key={index} label={category} color="primary" size="small" />
          ))}
        </CategoryBox>
      </CardContentContainer>
      <Footer>
        <Likes variant="body2">
          <Favorite fontSize="small" style={{ marginRight: '5px', color: 'red' }} />
          {likes}
        </Likes>
        <Developers variant="body2">
          {t('current_developers')} {currentDevelopers}/{maxDevelopers}
        </Developers>
      </Footer>
    </CardContainer>
  );
};

export default ContentCard;
