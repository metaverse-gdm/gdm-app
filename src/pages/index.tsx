// src/pages/index.tsx

import { GetStaticProps } from 'next';
import ContentCard from '../components/ContentCard';
import { Container, Grid } from '@mui/material';
import path from 'path';
import fs from 'fs';

interface Content {
  image: string;
  title: string;
  description: string;
  categories?: string[];
  likes: number;
  currentDevelopers: number;
  maxDevelopers: number;
}

interface HomeProps {
  contents: Content[];
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public/data/content.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const contents: Content[] = JSON.parse(jsonData);

  return {
    props: {
      contents,
    },
  };
};

const Home: React.FC<HomeProps> = ({ contents }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        {contents.map((content, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ContentCard
              image={content.image}
              title={content.title}
              description={content.description}
              categories={content.categories}
              likes={content.likes}
              currentDevelopers={content.currentDevelopers}
              maxDevelopers={content.maxDevelopers}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
