import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

const QuestionBox = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  marginBottom: '12px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const ExpandIcon = styled(KeyboardArrowDownIcon)(({ isOpen }) => ({
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
  transition: 'transform 0.3s ease',
}));

const AnswerBox = styled(Box)(({ theme, isOpen }) => ({
  padding: isOpen ? '16px 20px' : '0 20px',
  maxHeight: isOpen ? '200px' : '0',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  opacity: isOpen ? 1 : 0,
}));

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = React.useState(null);

  const questions = [
    {
      question: 'Is Crack With Code free?',
      answer: 'No. In exchange, you get access to the absolute invisible AI assistant that can help you solve the code problem and land your FAANG dream.'
    },
    
    {
      question: 'What programming languages are supported?',
      answer: 'Python, Golang, C#, Rust, R, SQL, Ruby, Java, Javascript, C++, Kotlin, and Swift. You can edit your preferred language in the app or in your settings.'
    },
    
    {
      question: "I'm experiencing a bug, what should I do",
      answer: '9 times out of 10, you can uninstall and reinstall the app from this website. If that doesnt work, please email us and we will get back to you within 24 hours.'
    },
    {
      question: 'Does the app work with current Zoom versions?',
      answer: 'Yes, Crack with Code is regularly updated to maintain compatibility with the latest versions of Zoom and other video conferencing platforms.'
    },
    {
      question: 'I got a FAANG offer using your software. Is there any reward? ',
      answer: 'Yes, if you got a FAANG offer use Crack with Code, please email us your offer letter and we will send you a reward(up to $400).'
    }
  ];

  const handleQuestionClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <Box
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: 8,
        minHeight: '100vh',
      }}
    >
      <Container id="faq" maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: 'grey.300'
          }}
        >
          FAQ
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'grey.500'
          }}
        >
          Everything you need to know about Crack With Code.
        </Typography>

        {questions.map((item, index) => (
          <div key={index}>
            <QuestionBox onClick={() => handleQuestionClick(index)}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 'normal'
                }}
              >
                {item.question}
              </Typography>
              <ExpandIcon isOpen={openQuestion === index} />
            </QuestionBox>
            <AnswerBox isOpen={openQuestion === index}>
              <Typography
                variant="body1"
                sx={{
                  color: 'grey.400'
                }}
              >
                {item.answer}
              </Typography>
            </AnswerBox>
          </div>
        ))}

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body1" sx={{ color: 'grey.500' }}>
            Have more questions? Visit our{' '}
            <Typography
              component="span"
              sx={{
                color: '#FFD700',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              help center
            </Typography>{' '}
            for detailed guides and support.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
