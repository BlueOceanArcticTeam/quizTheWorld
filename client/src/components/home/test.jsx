import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';

const Example = function (props) {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ];

  return (
    <Carousel>
      {
                items.map((item, i) => <ListItem key={i} item={item} />)
            }
    </Carousel>
  );
};

export default Example;
