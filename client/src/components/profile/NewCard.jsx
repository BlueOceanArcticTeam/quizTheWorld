import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewCard = function (header, content) {
  return (
    <Card sx={{
      width: '10vw', background: 'linear-gradient(#FE6845, #570A9A)', borderRadius: 5,
    }}
    >
      <CardContent style={{ display: 'grid', justifyContent: 'center', color: 'white' }}>
        <h6 style={{ display: 'grid', justifyContent: 'center' }}>{header}</h6>
        <br />
        <h3 style={{ padding: 'none', margin: 'none' }}>{content}</h3>
      </CardContent>
    </Card>
  );
};

export default NewCard;
