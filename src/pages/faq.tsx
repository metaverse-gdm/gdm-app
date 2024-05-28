// File: ./pages/faq.tsx

import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

const faqItems = [
  {
    question: 'faq_question_1',
    answer: 'faq_answer_1',
  },
  {
    question: 'faq_question_2',
    answer: 'faq_answer_2',
  },
  {
    question: 'faq_question_3',
    answer: 'faq_answer_3',
  },
];

const Faq: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('faq')}
        </Typography>
        {faqItems.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t(item.question)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t(item.answer)}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default Faq;
