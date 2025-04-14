import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledPre = styled('pre')(({ theme }) => ({
  backgroundColor: 'rgba(22, 28, 36, 0.94)',
  borderRadius: 8,
  padding: theme.spacing(2),
  margin: 0,
  overflow: 'auto',
  '& code': {
    color: '#fff',
    fontFamily: 'Monaco, monospace',
    fontSize: '14px',
    lineHeight: 1.5,
  },
}));

const LineNumber = styled('span')({
  color: 'rgba(255, 255, 255, 0.3)',
  marginRight: '1em',
  userSelect: 'none',
});

const Comment = styled('span')({
  color: 'rgba(255, 255, 255, 0.5)',
});

const Keyword = styled('span')({
  color: '#C678DD',
});

const String = styled('span')({
  color: '#98C379',
});

const Type = styled('span')({
  color: '#61AFEF',
});

export default function CodeSolution() {
  return (
    <Box
      sx={{
        bgcolor: '#000',
        color: '#fff',
        py: 8,
        px: 4,
      }}
    >
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#00AB55',
          mb: 2,
          fontWeight: 500,
        }}
      >
        Solve
      </Typography>
      
      <Typography
        variant="h2"
        sx={{
          fontSize: '3.5rem',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        Get your solutions
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 6,
        }}
      >
        Once you've captured your screenshots, press ⌘ + ↵ to generate solutions. We'll analyze the problem and provide a solution with detailed explanations.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 2,
          }}
        >
          Thoughts (Read these aloud)
        </Typography>
        <Box component="ul" sx={{ color: 'rgba(255, 255, 255, 0.7)', pl: 2 }}>
          <li>We need to find two numbers that sum to the target value.</li>
          <li>We can use a hash map to store numbers we've seen.</li>
          <li>For each number, check if its complement exists in the map.</li>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 2,
          }}
        >
          Solution
        </Typography>
        <StyledPre>
          <code>
            <LineNumber>1</LineNumber><Keyword>def</Keyword> twoSum(nums: <Type>List[int]</Type>, target: <Type>int</Type>) -{'>'} <Type>List[int]</Type>:<br/>
            <LineNumber>2</LineNumber>  seen = {'{}'} <Comment># Value -{'>'} Index mapping</Comment><br/>
            <LineNumber>3</LineNumber>  <Keyword>for</Keyword> i, num <Keyword>in</Keyword> enumerate(nums):<br/>
            <LineNumber>4</LineNumber>    complement = target - num<br/>
            <LineNumber>5</LineNumber>    <Keyword>if</Keyword> complement <Keyword>in</Keyword> seen:<br/>
            <LineNumber>6</LineNumber>      <Keyword>return</Keyword> [seen[complement], i]<br/>
            <LineNumber>7</LineNumber>    seen[num] = i<br/>
            <LineNumber>8</LineNumber>  <Keyword>return</Keyword> [] <Comment># No solution found</Comment>
          </code>
        </StyledPre>
      </Box>

      <Box>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 2,
          }}
        >
          Complexity
        </Typography>
        <Box component="ul" sx={{ color: 'rgba(255, 255, 255, 0.7)', pl: 2 }}>
          <li>Time Complexity: O(n)</li>
          <li>Space Complexity: O(n)</li>
        </Box>
      </Box>
    </Box>
  );
} 