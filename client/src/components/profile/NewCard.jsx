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
      width: 'auto', background: 'linear-gradient(#FE6845, #570A9A)', borderRadius: 5,
    }}
    >
      <CardContent style={{
        display: 'grid', justifyContent: 'center', color: 'white', textAlign: 'center', position: 'relative',
      }}
      >
        <h5 style={{
          display: 'grid', justifyContent: 'center', marginBottom: '0px', aligntext: 'center', marginTop: '0px',
        }}
        >
          {header}
        </h5>
        <hr style={{ width: '100%', marginTop: '0' }} />
        <h6 style={{
          padding: 'none', margin: 'auto', marginTop: '0px', marginBottom: '0px', width: '100%',
        }}
        >
          {content}
        </h6>
      </CardContent>
    </Card>
  );
};

export default NewCard;
