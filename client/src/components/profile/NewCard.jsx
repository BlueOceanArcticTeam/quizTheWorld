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
      width: '10vw', background: 'linear-gradient(#FE6845, #570A9A)', borderRadius: 5, height: '20vh',
    }}
    >
      <CardContent style={{
        display: 'grid', justifyContent: 'center', color: 'white', textAlign: 'center', position: 'relative',
      }}
      >
        <h6 style={{
          display: 'grid', justifyContent: 'center', marginBottom: '0px', aligntext: 'center', marginTop: '0px',
        }}
        >
          {header}
        </h6>
        <h6 style={{
          padding: 'none', margin: 'auto', marginTop: '0px', marginBottom: '0px', position: 'absolute', width: '100%', bottom: '-50%',
        }}
        >
          {content}
        </h6>
      </CardContent>
    </Card>
  );
};

export default NewCard;
