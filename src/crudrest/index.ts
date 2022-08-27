import {Router as rtr} from 'express';
import d from './initialdata.json';

type User = {
  id: number;
  name: string;
  country: string;
  friends: number;
};

const initialdata = d as unknown; // Typescript check
const data = initialdata as User[];

const router = rtr();

router.get('/users', (req, res) => {
  res.json(data);
});

router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = data.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({msg: 'User not found'});
  }
});

router.post('/users', (req, res) => {
  const user = req.body;
  if (user && user.id && user.name && user.country && user.friends) {
    data.push(user);
    res.json(user);
  } else {
    res.status(400).json({msg: 'Bad request'});
  }
});

router.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = data.find((user) => user.id === id);
  if (user) {
    const index = data.indexOf(user);
    data[index] = req.body;
    res.json(data[index]);
  } else {
    res.status(404).json({msg: 'User not found'});
  }
});

router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = data.find((user) => user.id === id);
  if (user) {
    const index = data.indexOf(user);
    data.splice(index, 1);
    res.json({msg: 'User deleted'});
  } else {
    res.status(404).json({msg: 'User not found'});
  }
});

export default router;
